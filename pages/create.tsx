import { Box, Heading, useStyleConfig, IconButton, Flex, Center } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Remirror, useRemirror } from '@remirror/react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BlockquoteExtension,
  BoldExtension,
  CalloutExtension,
  CodeExtension,
  HeadingExtension,
  HistoryExtension,
  ImageExtension,
  ItalicExtension,
  ListItemExtension,
  MarkdownExtension,
  UnderlineExtension,
} from 'remirror/extensions';

import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

import CreateSessionModal from '@/components/Session/CreateSessionModal';
import Editor from '../components/Editor/Editor';
import { HyperlinkExtension, TagExtension } from '../components/Editor/extensions';

import NotesList from '../components/NoteList';
import NotesListDrawer from '../components/NoteListDrawer';
import { storage } from '../firebase/clientApp';
import { useNoteContext } from '../contexts/NoteContext';

const Create = () => {
  const [showModal, setShowModal] = useState(false);

  const { user } = useAuth();
  const { notes, tags, setEditing } = useNoteContext();
  const [note, setNote] = useState<any>();
  const [loadedNote, setLoadedNote] = useState(false);
  const router = useRouter();
  const { manager, state, setState } = useRemirror({
    extensions: () => [
      new BoldExtension({}),
      new ItalicExtension({}),
      new CodeExtension({}),
      new HeadingExtension({}),
      new BlockquoteExtension({}),
      new HistoryExtension({}),
      new ImageExtension(),
      new MarkdownExtension({}),
      new CalloutExtension({ defaultType: 'warn' }),
      new ListItemExtension({ enableCollapsible: true }),
      HyperlinkExtension(),
      TagExtension(),
      new UnderlineExtension(),
    ],
    content: '<h1>Untitled...</h1>',
    stringHandler: 'html',
  });

  //tag filtering section
  const [tagFilter, setTagFilter] = useState('');
  const [taggedNotes, setTaggedNotes] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);

  function generateUniqueTagList() {
    const filterTags = new Set(tags.filter((tag) => tag.noteRef !== undefined).map((tag) => tag.label));

    const filterTagsArray = Array.from(filterTags);

    return filterTagsArray;
  }

  useEffect(() => {
    setTagsArray(() => generateUniqueTagList());

    if (!tagFilter) {
      setTaggedNotes(notes);
    } else if (tagFilter) {
      setTaggedNotes(() => getFilteredNotes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagFilter, notes]);

  function getFilteredNotes() {
    const filterNotes = notes.filter((note) => {
      return note.tags.some((elem: any) => elem.label === tagFilter);
    });

    return filterNotes;
  }
  // end tag filtering section

  const noteQuery = router.query.noteId;

  const filteredNotes = notes.filter((note) => note.noteId === noteQuery);

  const forceLoad = useCallback(
    (note) => {
      const doc = {
        type: 'doc',
        content: note.content.content,
      };
      manager.view.updateState(manager.createState({ content: doc }));
    },
    [manager]
  );

  useEffect(() => {
    setNote(() => filteredNotes[0]);
    if (noteQuery && note) {
      if (loadedNote === false) {
        setEditing(() => note.noteId);
        forceLoad(note);
        setLoadedNote(true);
      }
    }
  }, [filteredNotes, forceLoad, loadedNote, note, noteQuery, setEditing]);

  const createNew = () => {
    setEditing(() => null);
    manager.view.updateState(manager.createState({ content: '<h1>Untitled</h1>', stringHandler: 'html' }));
  };

  const handleChange = (p) => {
    for (let i = 0; i < p.state.doc.content.content.length; i++) {
      const len = p.state.doc.content.content[i].content.content.length;
      for (let j = 0; j < len; j++) {
        if (p.state.doc.content.content[i].content.content[j].attrs.fileName) {
          const file = p.state.doc.content.content[i].content.content[j].attrs;
          changeHandler(file, i, j, p.state);
        }
      }
    }
    setState(p.state);
  };

  function changeHandler(file, i, j, state) {
    if (!file) return;
    const storageRef = ref(storage, `${file.fileName}`);
    const uploadTask = uploadString(storageRef, file.src, 'data_url');

    uploadTask.then((snapshot) => {
      const newState = state;
      getDownloadURL(snapshot.ref).then((url) => {
        newState.doc.content.content[i].content.content[j].attrs.src = url;
        setState(newState);
      });
    });
  }

  /* Redirect if no user state is found, i.e. user is unauthenticated or has refreshed. */
  useEffect(() => {
    if (!user) router.push('/');
  }, [router, user]);

  if (!user) return <p>Redirecting...</p>;

  return (
    <>
      <Box display={{ md: 'none' }} margin="20px" textAlign={'center'}>
        {
          <>
            <NotesListDrawer
              // @ts-ignore
              tagsArray={tagsArray}
              taggedNotes={taggedNotes}
              setTagFilter={setTagFilter}
              forceLoad={forceLoad}
            />
            <IconButton
              size="sm"
              variant="ghost"
              aria-label="Create new note"
              icon={<AddIcon />}
              onClick={() => createNew()}
            />
          </>
        }
      </Box>
      <Flex justify={'center'}>
        <Box
          w="280px"
          minW="280px"
          h="min-content"
          ml={'40px'}
          mt={'47px'}
          display={{ base: 'none', md: 'flex' }}
          overflow="hidden"
          isTruncated
        >
          <NotesList
            forceLoad={forceLoad}
            createNew={createNew}
            tagsArray={tagsArray}
            taggedNotes={taggedNotes}
            setTagFilter={setTagFilter}
          />
        </Box>
        <Box w="100%" ml="40px" mr="40px">
          <div className="remirror-theme">
            <Remirror manager={manager} state={state} onChange={handleChange}>
              <Editor state={state} manager={manager} setShowModal={setShowModal} />
            </Remirror>
          </div>
        </Box>
      </Flex>
      {showModal ? <CreateSessionModal isOpen={showModal} setShowModal={setShowModal} /> : <></>}
    </>
  );
};

export default Create;
