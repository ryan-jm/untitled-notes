import 'remirror/styles/all.css';

import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { ReactSsrExtension } from '@remirror/extension-react-ssr';
import { Remirror, ThemeProvider, useRemirror } from '@remirror/react';
import React, { useMemo } from 'react';
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
import NotesList from '../components/NoteList';
import { HyperlinkExtension } from '../components/Editor/extensions';

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
  });

  return (
    <Flex justifyContent="flex-start" flexWrap="wrap" mt={2} width="100%">
      <NotesList />
      <div className="remirror-theme">
        <Remirror manager={manager} state={state} onChange={(p) => setState(p.state)}>
          <Editor state={state} manager={manager} />
        </Remirror>
      </div>
    </Flex>
  );
};

export default Create;

{
  /* <Grid display={{ base: 'flex' }} width="100%" templateColumns="10% 90%" mx="auto">
        <GridItem>
          <NotesList />
        </GridItem>
        <GridItem>
          <div className="remirror-theme">
            <Remirror manager={manager} state={state} onChange={(p) => setState(p.state)}>
              <Editor state={state} manager={manager} />
            </Remirror>
          </div>
        </GridItem>
      </Grid> */
}
