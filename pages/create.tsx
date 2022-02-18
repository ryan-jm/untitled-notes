import 'remirror/styles/all.css';

import { Remirror, useRemirror } from '@remirror/react';
import React from 'react';
import { BoldExtension, CalloutExtension, ItalicExtension } from 'remirror/extensions';

import Editor from '../components/Editor';

const Create = () => {
  const { manager, state, setState } = useRemirror({
    extensions: () => [new BoldExtension({}), new ItalicExtension({}), new CalloutExtension({ defaultType: 'warn' })],
  });

  return (
    <div className="remirror-theme">
      <Remirror manager={manager} state={state} onChange={(p) => setState(p.state)}>
        <Editor state={state} manager={manager} />
      </Remirror>
    </div>
  );
};

export default Create;
