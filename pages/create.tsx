import { Box, Flex } from '@chakra-ui/react';
import { ReactSsrExtension } from '@remirror/extension-react-ssr';
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
  UnderlineExtension,
} from 'remirror/extensions';

import Editor from '../components/Editor/Editor';
import NotesList from '../components/NoteList';
import NotesListDrawer from '../components/NoteListDrawer';
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
    <>
      <Box display={{ md: 'none' }} margin="20px" textAlign={'center'}>
        <NotesListDrawer />
      </Box>
      <Flex justify={'center'}>
        <Box
          w="250px"
          minW="250px"
          h="min-content"
          ml={'40px'}
          mt={'47px'}
          display={{ base: 'none', md: 'flex' }}
          overflow="hidden"
          isTruncated
        >
          <NotesList />
        </Box>
        <Box w="100%" ml="40px" mr="40px">
          <div className="remirror-theme">
            <Remirror manager={manager} state={state} onChange={(p) => setState(p.state)}>
              <Editor state={state} manager={manager} />
            </Remirror>
          </div>
        </Box>
      </Flex>
    </>
  );
};

export default Create;
