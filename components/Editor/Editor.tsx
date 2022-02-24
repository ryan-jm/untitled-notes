import { Box, Button } from '@chakra-ui/react';
import { EditorComponent, useHelpers } from '@remirror/react';
import { saveAs } from 'file-saver';
import { addDoc, collection, getDocsFromServer, limit, orderBy, query, Timestamp, where } from 'firebase/firestore';
import React from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/clientApp';
import EditorButtons from './EditorButtons';
import HyperlinkToolbar from './HyperlinkToolbar';

// FileSaver.js library
const Editor = ({ state, manager }: any) => {
  const { user } = useAuth();
  const { getJSON, getMarkdown } = useHelpers();

  const handleSave = () => {
    const collectionRef = collection(db, 'notes');
    const content = getJSON(state);
    const dbEntry = {
      created_at: Timestamp.fromDate(new Date(Date.now())),
      content,
      user: user.uid,
    };
    addDoc(collectionRef, dbEntry);
  };

  const loadNote = async () => {
    // queries the db for the last created note, based on created_at timestamp.
    const lastNoteQuery = query(
      collection(db, 'notes'),
      where('user', '==', user.uid),
      orderBy('created_at', 'desc'),
      limit(1)
    );
    const getLastNote = await getDocsFromServer(lastNoteQuery);
    const lastNote = getLastNote.docs[0].data();

    const doc = {
      type: 'doc',
      content: lastNote.content.content,
    };

    manager.view.updateState(manager.createState({ content: doc }));
  };

  const localSave = () => {
    const inputState = getMarkdown(state);
    console.log(inputState);

    const blob = new Blob([inputState], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'UntitledNote.md');
  };

  return (
    <>
      <Box textAlign="center">
        <EditorButtons />
      </Box>
      <EditorComponent />
      <HyperlinkToolbar />
      <Box mt="20px" textAlign="center">
        <Button onClick={handleSave} size="sm" variant="toolbar">
          Save
        </Button>
        &nbsp;
        <Button onClick={localSave} size="sm" variant="toolbar">
          Save Locally
        </Button>
        &nbsp;
        <Button onClick={loadNote} size="sm" variant="toolbar">
          Load Last Saved Note
        </Button>
      </Box>
    </>
  );
};

export default Editor;
