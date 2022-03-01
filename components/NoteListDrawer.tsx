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

import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/clientApp';

import { useNoteContext } from '../contexts/NoteContext';
import NoteEntry from './NoteEntry';

const NotesListDrawer = ({ forceLoad }) => {
  const { notes, setEditing } = useNoteContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const handleChange = (note) => {
    setEditing(() => note.noteId);
    forceLoad(note);
  };

  function deleteNote(id) {
    const deleteDocument = doc(db, 'notes', id);
    deleteDoc(deleteDocument);
  }
  function populateNotesList(): JSX.Element[] {
    return notes
      ? notes.reverse().map((note, index) => {
          return (
            <div key={note.noteId}>
              <NoteEntry handleChange={handleChange} note={note} deleteNote={deleteNote} />
            </div>
          );
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
          {/* <DrawerBody>body</DrawerBody> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotesListDrawer;
