import React from 'react';

import { EditorComponent, useHelpers } from '@remirror/react';

import { addDoc, collection, getDocsFromServer, query, Timestamp, where, orderBy, limit } from 'firebase/firestore';

// FileSaver.js library
import { saveAs } from 'file-saver';

import { Button, ButtonGroup } from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/clientApp';

import EditorButtons from './editor-buttons/EditorButtons';

// const hooks = [
//   () => {
//     const { getJSON } = useHelpers();

//     const handleSaveShortcut = useCallback(
//       ({ state }) => {
//         console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

//         return true; // Prevents any further key handlers from being run.
//       },
//       [getJSON]
//     );

//     // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
//     useKeymap('Mod-s', handleSaveShortcut);
//   },
// ];

const Editor = ({ state, manager }: any) => {
  const { user } = useAuth();
  const { getJSON, getText, getHTML, getMarkdown } = useHelpers();

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

  // function saveDynamicDataToFile() {
  //   var userInput = document.getElementById('myText').value;

  //   var blob = new Blob([userInput], { type: 'text/plain;charset=utf-8' });
  //   saveAs(blob, 'dynamic.txt');
  // }

  return (
    <>
      <EditorButtons />
      <EditorComponent />
      <ButtonGroup isAttached size="sm">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={localSave}>Save Locally</Button>
        <Button onClick={loadNote}>Load Last Saved Note</Button>
      </ButtonGroup>
    </>
  );
};

export default Editor;
