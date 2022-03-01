import { Remirror, useRemirror } from '@remirror/react';
import React from 'react';
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
  PlaceholderExtension,
  TrailingNodeExtension,
  UnderlineExtension,
  YjsExtension,
} from 'remirror/extensions';
import Editor from '../Editor/Editor';
import { HyperlinkExtension, TagExtension } from '../Editor/extensions';

const SessionEditor = ({ provider }: any) => {
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
      new PlaceholderExtension({ placeholder: 'Open second tab and start to type...' }),
      new YjsExtension({ getProvider: () => provider }),
    ],
    core: { excludeExtensions: ['history'] },
  });

  return (
    <div className="remirror-theme">
      <Remirror manager={manager} state={state} onChange={(p) => setState(p.state)}>
        <Editor state={state} manager={manager} />
      </Remirror>
    </div>
  );
};

export default SessionEditor;
