import { EditorComponent, useHelpers } from '@remirror/react';
import { addDoc, collection, getDocsFromServer, query, Timestamp, where } from 'firebase/firestore';
import React from 'react';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/clientApp';

const Editor = ({ state, manager }: any) => {
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

  const loadNote = async () => {
    // Currently loads the most recent note, but queries will remain useful for loading a list of all user-added notes.
    const totalNotes = [];
    const loadQuery = query(collection(db, 'notes'), where('user', '==', user.uid));
    const noteSnapshot = await getDocsFromServer(loadQuery);
    noteSnapshot.forEach((doc) => totalNotes.unshift(doc.data()));
    const doc = {
      type: 'doc',
      content: totalNotes[0].content.content,
    };

    manager.view.updateState(manager.createState({ content: doc }));
  };

  return (
    <>
      <EditorComponent />
      <button onClick={handleSave}>Save</button>
      <button onClick={loadNote}>Load</button>
    </>
  );
};

export default Editor;
