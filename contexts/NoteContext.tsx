import { collection, DocumentData, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';
import { createContext, Dispatch, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import type { RemirrorJSON } from '@remirror/core-types';
import { db } from '../firebase/clientApp';
import { useAuth } from './AuthContext';

enum NoteActionKind {
  Add = 'ADD',
  Remove = 'REMOVE',
  Edit = 'EDIT',
  Clear = 'CLEAR',
}

interface INote extends RemirrorJSON {
  content: RemirrorJSON[];
  created_at: string;
  title: string;
  user: string;
  noteId?: string;
  tags?: string[];
}

interface Action {
  type: NoteActionKind;
  payload?: any;
}

interface Tag {
  id: string;
  label: string;
  noteRef: string;
}

type TagUpdateAction = 'add' | 'remove' | 'edit';

interface INoteContext {
  notes?: INote[];
  setNotes: Dispatch<Action>;
  editing?: any;
  setEditing?: Dispatch<(prev: any) => any>;
  tags: Tag[];
  updateTags?: (tag: Tag[], type: TagUpdateAction) => void;
  checkForTags?: (note: INote | any, edit?: boolean) => Tag[];
  currentNote?: INote;
}

const initialState: INoteContext = {
  setNotes: () => {},
  tags: [],
};

export const NoteContext = createContext<INoteContext>(initialState);

const noteReducer = (state: INote[], action: Action): INote[] => {
  const { type, payload } = action;

  switch (type) {
    case NoteActionKind.Add:
      if (payload.constructor === Array) return [...payload, ...state];
      else return [...state, payload];
    case NoteActionKind.Remove:
      if (payload.constructor === Array) return [...state.filter((note: INote) => payload.indexOf(note) === -1)];
      else return [...state.filter((note: INote) => note.noteId !== payload?.noteId)];
    case NoteActionKind.Edit:
      return [payload, ...state.filter((note: INote) => note.noteId !== payload?.noteId)];
    case NoteActionKind.Clear:
      return [];
  }
};

const NoteProvider = ({ children }: any) => {
  const [tags, setTags] = useState([]);
  const [state, dispatch] = useReducer(noteReducer, []);
  const [editing, setEditing] = useState();
  const [disconnect, setDisconnect] = useState(null);
  const [currentNote, setCurrentNote] = useState<INote | undefined>();
  const { user } = useAuth();

  const updateTags = (tags: Tag[], type: TagUpdateAction, note?: any) => {
    switch (type) {
      case 'add':
        setTags((prev) => [...prev, ...tags]);
        break;
      case 'edit':
        console.log(note.noteId);
        const newTags = tags.filter((tag) => {
          return tag.noteRef === note.noteId;
        });
        console.log(newTags, 'newTags');
        setTags((prev) => [...prev.filter((tag) => tag.noteRef !== note.noteId), ...newTags]);
        break;
    }
  };

  const checkForTags = useCallback(
    (note: INote | any, edit?: boolean) => {
      const foundTags = [];

      console.log(note, 'note received');

      note.content.content.forEach((node) => {
        console.log(node);
        if (node.content?.length) {
          node.content
            .filter((nestedNode: Partial<RemirrorJSON>) => nestedNode.type === 'mentionAtom')
            .forEach((tagNode) => {
              const tag = {
                id: tagNode.attrs.id,
                label: tagNode.attrs.label,
                noteRef: edit ? editing : note?.noteId,
              };
              foundTags.push(tag);
            });
        }
        if (node.type === 'mentionAtom') {
          const tag = {
            id: node.attrs.id,
            label: node.attrs.label,
            noteRef: edit ? editing : note.noteId,
          };
          foundTags.push(tag);
        }
      });

      return foundTags;
    },
    [editing]
  );

  useEffect(() => {
    if (user?.uid) {
      const q = query(collection(db, 'notes'), where('user', '==', user.uid), orderBy('created_at', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
        snapshot.docChanges().forEach((change) => {
          const noteId = change.doc.id;
          const incomingNote = change.doc.data();
          incomingNote['noteId'] = noteId;
          incomingNote['tags'] = checkForTags(incomingNote);
          switch (change.type) {
            case 'added': {
              updateTags(incomingNote.tags, 'add');
              dispatch({ type: NoteActionKind.Add, payload: { ...incomingNote, noteId } });
              break;
            }
            case 'removed': {
              dispatch({ type: NoteActionKind.Remove, payload: { ...incomingNote, noteId } });
              break;
            }
            case 'modified': {
              const modifiedNote = { ...incomingNote };
              const noteTags = checkForTags(modifiedNote);
              modifiedNote['noteId'] = noteId;
              modifiedNote['tags'] = noteTags;
              updateTags(modifiedNote.tags, 'edit', modifiedNote);
              dispatch({ type: NoteActionKind.Edit, payload: modifiedNote });
              break;
            }
          }
        });
      });
      setDisconnect(() => unsubscribe);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  useEffect(() => {
    if (editing !== currentNote?.noteId) {
      const newCurrentNote = state.filter((note) => note.noteId == editing);
      setCurrentNote(newCurrentNote[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  useEffect(() => {
    console.log(currentNote, '<- current note');
  }, [currentNote]);

  useEffect(() => {
    if (disconnect && !user?.uid) {
      dispatch({ type: NoteActionKind.Clear });
      disconnect();
    }
  }, [disconnect, user?.uid]);

  return (
    <NoteContext.Provider
      value={{ notes: state, setNotes: dispatch, editing, setEditing, tags, updateTags, checkForTags }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => useContext(NoteContext);

export default NoteProvider;
