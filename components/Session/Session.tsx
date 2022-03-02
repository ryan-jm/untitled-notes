import { Button } from '@chakra-ui/react';
import { Remirror, useRemirror } from '@remirror/react';
import React, { useEffect, useState, useCallback } from 'react';
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
  AnnotationExtension,
  UnderlineExtension,
  YjsExtension,
} from 'remirror/extensions';
import { HyperlinkExtension, TagExtension } from '../Editor/extensions';
import { useObservableListener } from './hooks';
import SessionEditor from './SessionEditor';

const Session = ({ provider, initialContent, owner, id }: any) => {
  const [isOwner, setIsOwner] = useState(null);
  const [clientCount, setClientCount] = useState<number>(0);

  useEffect(() => {
    if (!isOwner) {
      setIsOwner(owner);
    }
  }, [owner, isOwner, initialContent]);

  const handlePeersChange = useCallback(
    ({ webrtcPeers }) => {
      setClientCount(webrtcPeers.length);
    },
    [setClientCount]
  );

  useObservableListener('peers', handlePeersChange, provider);

  const createExtensions = useCallback(
    () => [
      new AnnotationExtension(),
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
      new YjsExtension({ getProvider: () => provider }),
    ],
    [provider]
  );

  const { manager, state, setState } = useRemirror({
    extensions: createExtensions,
    core: { excludeExtensions: ['history'] },
    content: owner ? initialContent : undefined,
  });

  return (
    <div className="remirror-theme">
      <Remirror manager={manager} state={state} onChange={(p) => setState(p.state)}>
        <SessionEditor owner={isOwner} manager={manager} id={id} />
      </Remirror>
    </div>
  );
};

export default Session;
