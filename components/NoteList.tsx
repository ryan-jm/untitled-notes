import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Text,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { useNoteContext } from '../contexts/NoteContext';

const NotesList = ({ forceLoad, createNew }: any) => {
  const [displayName, setDisplayName] = useState('');
  const { notes, setEditing } = useNoteContext();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const router = useRouter();

  useEffect(() => {
    if (!user?.accessToken) {
      router.push('/auth');
    }
  }, [notes, router, user?.uid, user?.accessToken]);

  const handleChange = (note) => {
    setEditing(() => note.noteId);
    forceLoad(note);
  };

  return (
    <>
      <>
        <Button display={{ md: 'none' }} mb="1" ref={btnRef} colorScheme="teal" onClick={onOpen}>
          Open
        </Button>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{displayName}s Notes</DrawerHeader>
            <DrawerBody>
              {notes
                ? notes.map((note) => {
                    if (note.title) {
                      return (
                        <Text fontSize="sm" isTruncated onClick={() => handleChange(note)}>
                          {note.title}
                          <hr></hr>
                        </Text>
                      );
                    } else {
                      return 'untitled';
                    }
                  })
                : 'untitled'}
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>

      <Box w="100%" h={80} borderWidth={1} borderRadius="lg" p="3" isTruncated>
        <div>
          <Flex justify="space-between">
            <Heading
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="md"
              letterSpacing="wide"
              color="teal.600"
              pb={3}
            >
              Your notes
            </Heading>
            <IconButton aria-label="Create new note" icon={<AddIcon />} onClick={() => createNew()} />
          </Flex>
          {notes
            ? notes.map((note) => {
                if (note.title) {
                  return (
                    <Text fontSize="sm" isTruncated onClick={() => handleChange(note)}>
                      {note.title}
                      <hr></hr>
                    </Text>
                  );
                } else {
                  return 'untitled';
                }
              })
            : 'untitled'}
        </div>
      </Box>
    </>
  );
};

export default NotesList;
