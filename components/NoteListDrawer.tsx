import React from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
  Heading,
  Divider,
} from '@chakra-ui/react';

import { useNoteContext } from '../contexts/NoteContext';

const NotesList = () => {
  const { notes, setEditing } = useNoteContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  function populateNotesList() {
    return notes
      ? notes.map((note) => {
          if (note.content.content[0].content && note.content.content[0].content[0]?.text) {
            return (
              <Box isTruncated pt="20px">
                <Heading isTruncated fontSize="md">
                  {note.content.content[0].content[0].text}
                  <Divider />
                </Heading>
              </Box>
            );
          } else {
            return (
              <Box isTruncated pt="20px">
                <Heading isTruncated fontSize="md">
                  Untitled
                  <Divider />
                </Heading>
              </Box>
            );
          }
        })
      : undefined;
  }

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Your Notes
      </Button>
      <Drawer size="full" isOpen={isOpen} placement="bottom" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader pb="0">
            <Heading isTruncated fontWeight="bold" textTransform="uppercase" fontSize="md" color="iris.100" p="0">
              Your Latest Notes
            </Heading>
          </DrawerHeader>
          <DrawerBody>{populateNotesList()}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotesList;
