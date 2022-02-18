import { EditorComponent, useHelpers } from '@remirror/react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React from 'react';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/clientApp';

const Editor = ({ state }: any) => {
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

  return (
    <>
      <EditorComponent />
      <button onClick={handleSave}>Save</button>
    </>
  );
};

export default Editor;
