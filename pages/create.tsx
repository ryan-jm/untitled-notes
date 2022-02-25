import 'remirror/styles/all.css';

import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { ReactSsrExtension } from '@remirror/extension-react-ssr';
import { Remirror, useRemirror } from '@remirror/react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
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
  UnderlineExtension,
} from 'remirror/extensions';

import Editor from '../components/Editor/Editor';
import { HyperlinkExtension } from '../components/Editor/extensions';
import NotesList from '../components/NoteList';
import { storage } from '../firebase/clientApp';

const Create = () => {
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
      new UnderlineExtension(),
      new ReactSsrExtension({}),
    ],
    content: '<h1>Untitled...</h1>',
    stringHandler: 'html',
  });

  const handleChange = (p) => {
    for (let i = 0; i < p.state.doc.content.content.length; i++) {
      const len = p.state.doc.content.content[i].content.content.length;
      for (let j = 0; j < len; j++) {
        if (p.state.doc.content.content[i].content.content[j].attrs.fileName) {
          const file = p.state.doc.content.content[i].content.content[j].attrs;
          changeHandler(file, i, j, p.state);
        }
      }
    }
    setState(p.state);
  };

  function changeHandler(file,i,j,state) {
    if (!file) return;
    const storageRef = ref(storage, `/files2/${file.fileName}`);
    const uploadTask = uploadString(storageRef, file.src, 'data_url');

    uploadTask.then((snapshot) => {
      const newState = state;
      getDownloadURL(snapshot.ref).then((url) => {
        newState.doc.content.content[i].content.content[j].attrs.src = url;
        setState(newState);
      });
    });
  }

  return (
    <Flex justifyContent="center" mt={2} width="100%">
      <Grid width="100%" templateColumns="10% 90%" mx="auto">
        <GridItem>
          <NotesList />
        </GridItem>
        <GridItem>
          <div className="remirror-theme">
            <Remirror manager={manager} state={state} onChange={handleChange}>
              <Editor state={state} manager={manager} />
            </Remirror>
          </div>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Create;
