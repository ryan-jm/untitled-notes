import { EditorComponent, useHelpers } from '@remirror/react';
import { addDoc, collection, getDocsFromServer, query, Timestamp, where, orderBy, limit } from 'firebase/firestore';
import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from 'firebase/storage';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { storage, db } from '../firebase/clientApp';
import { useAuth } from '../contexts/AuthContext';

import EditorButtons from './editor-buttons/EditorButtons';

const Editor = ({ state, manager }: any) => {
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const { getJSON } = useHelpers();

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

  function changeHandler(file) {
    if (!file) return;
    console.log('in side of function');

    const storageRef = ref(storage, `/files2/${file.fileName}`);
    const uploadTask = uploadString(storageRef, file.src, 'data_url');

    uploadTask.then((snapshot) => {
      const newState = state;
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url, 'url of snapshot');

        // newState.doc.content.content[i].content.content[j].attrs.src = url
        // console.log(newState.doc.content.content,"lasttt<<<<<<>>>>>>>>>");
      });
    });
  }

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

  return (
    <>
      <EditorButtons />
      <EditorComponent />
      <ButtonGroup isAttached size="sm">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={loadNote}>Load</Button>
      </ButtonGroup>
    </>
  );
};

export default Editor;
