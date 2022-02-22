import { Button, ButtonGroup } from '@chakra-ui/react';
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
    // Currently loads the most recent note, but queries will remain useful for loading a list of all user-added notes.
    const totalNotes = [];
    const loadQuery = query(collection(db, 'notes'), where('user', '==', user.uid));
    const noteSnapshot = await getDocsFromServer(loadQuery);

    // queries the db for the last created note, based on created_at timestamp.
    const lastNoteQuery = query(
      collection(db, 'notes'),
      where('user', '==', user.uid),
      orderBy('created_at', 'desc'),
      limit(1)
    );
    const getLastNote = await getDocsFromServer(lastNoteQuery);
    const lastNote = getLastNote.docs[0].data();

    noteSnapshot.forEach((doc) => totalNotes.unshift(doc.data()));
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
      <EditorButtons />
      <EditorComponent />
      <HyperlinkToolbar />
      <ButtonGroup isAttached size="sm">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={localSave}>Save Locally</Button>
        <Button onClick={loadNote}>Load Last Saved Note</Button>
      </ButtonGroup>
    </>
  );
};

export default Editor;
