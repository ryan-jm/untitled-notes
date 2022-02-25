import { collection, DocumentData, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';
import { createContext, Dispatch, useContext, useEffect, useMemo, useReducer, useState } from 'react';

import { db } from '../firebase/clientApp';
import { useAuth } from './AuthContext';

enum NoteActionKind {
  Add = 'ADD',
  Remove = 'REMOVE',
  Edit = 'EDIT',
  Clear = 'CLEAR',
}

interface INote {
  content: any;
  created_at: string;
  title: string;
  user: string;
  noteId: string;
}

interface Action {
  type: NoteActionKind;
  payload?: any;
}

interface INoteContext {
  notes?: INote[];
  setNotes: Dispatch<Action>;
  editing?: any;
  setEditing?: Dispatch<(prev: any) => any>;
}

const initialState: INoteContext = {
  setNotes: () => {},
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
  const [state, dispatch] = useReducer(noteReducer, []);
  const [editing, setEditing] = useState();
  const [disconnect, setDisconnect] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      console.log('This works!');
      const q = query(collection(db, 'notes'), where('user', '==', user.uid), orderBy('created_at', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
        snapshot.docChanges().forEach((change) => {
          const noteId = change.doc.id;
          switch (change.type) {
            case 'added':
              dispatch({ type: NoteActionKind.Add, payload: { ...change.doc.data(), noteId } });
              break;
            case 'removed':
              dispatch({ type: NoteActionKind.Remove, payload: { ...change.doc.data(), noteId } });
              break;
            case 'modified':
              const modifiedNote = { ...change.doc.data() };
              modifiedNote['noteId'] = noteId;
              dispatch({ type: NoteActionKind.Edit, payload: modifiedNote });
              break;
          }
        });
      });
      setDisconnect(() => unsubscribe);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    if (disconnect && !user?.uid) {
      disconnect();
      dispatch({ type: NoteActionKind.Clear });
      disconnect();
    }
  }, [disconnect, user?.uid]);

  return (
    <NoteContext.Provider value={{ notes: state, setNotes: dispatch, editing, setEditing }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => useContext(NoteContext);

export default NoteProvider;
