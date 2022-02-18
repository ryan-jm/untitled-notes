import 'remirror/styles/all.css';

import { Remirror, useRemirror } from '@remirror/react';
import { collection, Timestamp } from 'firebase/firestore';
import React from 'react';
import { BoldExtension, CalloutExtension, ItalicExtension } from 'remirror/extensions';

import Editor from '../components/Editor';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/clientApp';

const Create = () => {
  const { user } = useAuth();

  const { manager, state, setState } = useRemirror({
    extensions: () => [
      new BoldExtension({}),
      new ItalicExtension({}),
      new CalloutExtension({ defaultType: 'warn' }),
    ],
  });

  const handleSave = () => {
    const collectionRef = collection(db, 'notes');
    const content = getJSON(state);
    const dbEntry = {
      created_at: Timestamp.fromDate(new Date(Date.now())),
      content,
      user: null,
    };
    console.log(user);
  };

  return (
    <div className="remirror-theme">
      <Remirror manager={manager} state={state} onChange={(p) => setState(p.state)}>
        <Editor />
      </Remirror>
    </div>
  );
};

export default Create;
