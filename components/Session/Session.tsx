import { Remirror, useRemirror } from '@remirror/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { RemirrorJSON } from 'remirror';
import { useDebouncedCallback } from 'use-debounce';
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
import { db } from '../../firebase/clientApp';
import { HyperlinkExtension, TagExtension } from '../Editor/extensions';
import { useObservableListener } from './hooks';
import SessionEditor from './SessionEditor';

const Session = ({ provider, initialContent, owner, id }: any) => {
  const usedFallbackRef = useRef<boolean>(false);
  const [isOwner, setIsOwner] = useState(null);
  const [clientCount, setClientCount] = useState<number>(0);
  const [isSynced, setIsSynced] = useState<boolean>(false);
  const [docState, setDocState] = useState<RemirrorJSON>();

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

  const { manager, getContext } = useRemirror({
    extensions: createExtensions,
    core: { excludeExtensions: ['history'] },
  });

  const handleChange = useCallback(
    ({ state, tr }) => {
      if (tr?.docChanged) {
        setDocState(state.toJSON().doc);
      }
    },
    [setDocState]
  );

  const handleSave = useCallback(
    (newDocState) => {
      if (isSynced || clientCount === 0) {
        const sessionRef = doc(db, 'sessions', id);
        const content = newDocState;
        const updatedNote = {
          content: content,
          noteId: id,
        };
        const dbEntry = {
          note: updatedNote,
        };
        updateDoc(sessionRef, dbEntry);
        const meta = provider.doc.getMap('meta');
        meta.set('lastSaved', Date.now());
      }
    },
    [id, provider.doc, isSynced, clientCount]
  );

  const TIMEOUT = 3000 + Math.floor(Math.random() * 7000);
  const handleSaveDebounced = useDebouncedCallback(handleSave, TIMEOUT);

  const handleSynced = useCallback(
    ({ synced }) => {
      setIsSynced(synced);
    },
    [setIsSynced]
  );

  useObservableListener('synced', handleSynced, provider);

  useEffect(() => {
    handleSaveDebounced(docState);
  }, [handleSaveDebounced, docState]);

  const handleYDocUpdate = useCallback(() => {
    handleSaveDebounced.cancel();
  }, [handleSaveDebounced]);

  useObservableListener('update', handleYDocUpdate, provider.doc);

  useEffect(() => {
    handleSaveDebounced(docState);
  }, [handleSaveDebounced, docState]);

  useEffect(() => {
    if (usedFallbackRef.current) return;

    const fetchFallback = async () => {
      if (provider.connected && clientCount === 0) {
        const sessionRef = doc(db, 'sessions', id);
        const sessionSnap = await getDoc(sessionRef);
        const sessionData = sessionSnap.data();
        getContext()?.setContent(sessionData.note.content);
      }
      usedFallbackRef.current = true;
    };

    const timeoutId = window.setTimeout(fetchFallback, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [clientCount, provider.connected, getContext, initialContent, id]);

  return (
    <div className="remirror-theme">
      <Remirror manager={manager} onChange={handleChange}>
        <SessionEditor owner={isOwner} manager={manager} id={id} />
        <div className="info-box">
          <p className="info">Connected clients: {clientCount + 1}</p>
          <p className="info">Synced: {isSynced || clientCount === 0 ? <p>True</p> : <p>false</p>}</p>
        </div>
      </Remirror>
    </div>
  );
};

export default Session;
