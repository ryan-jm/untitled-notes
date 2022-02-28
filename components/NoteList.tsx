import React, { useEffect } from 'react';
import {
  Box,
  Link,
  Heading,
  Divider,
  useStyleConfig,
  IconButton,
  useDisclosure,
  Circle,
  HStack,
  Square,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Button,
} from '@chakra-ui/react';

import { AddIcon, DeleteIcon, PhoneIcon } from '@chakra-ui/icons';

import { useRouter } from 'next/router';

import { deleteDoc, doc } from 'firebase/firestore';
import { log } from 'console';
import { useAuth } from '../contexts/AuthContext';
import { useNoteContext } from '../contexts/NoteContext';
import { db } from '../firebase/clientApp';
import NoteEntry from './NoteEntry';

const NotesList = ({ forceLoad, createNew }: any) => {
  const { notes, setEditing } = useNoteContext();
  const { user } = useAuth();
  const router = useRouter();

  console.log('NOTES --->', notes);

  useEffect(() => {
    if (!user?.accessToken) {
      router.push('/auth');
    }
  }, [notes, router, user?.uid, user?.accessToken]);

  const handleChange = (note) => {
    setEditing(() => note.noteId);
    forceLoad(note);
  };

  function deleteNote(id) {
    const deleteDocument = doc(db, 'notes', id);
    deleteDoc(deleteDocument);
  }

  function populateNotesList() {
   
    return notes
      ? notes.reverse().map((note) => {
          return (
            //Real
            // <Box key={note.title} isTruncated pt="20px">
            //   <Heading isTruncated fontSize="md">
            //     <Link onClick={() => handleChange(note)}><p draggable="true" >{note.title}</p></Link>
            //     <div className='droptarget' onDrop={drop} onDragOver={allowDrop}></div>
            //      <Divider />
            //   </Heading>
            // </Box>
            <div key={note.noteId}>
              <NoteEntry handleChange={handleChange} note={note} deleteNote={deleteNote} />
            </div>
          );
        })
      : undefined;
  }

  function NotesListBox(props) {
    const { size, variant, ...rest } = props;
    const styles = useStyleConfig('NotesListBox', { size, variant });
    return <Box as="span" sx={styles} {...rest} />;
  }

  return (
    <NotesListBox isTruncated>
      <Box h="min-content" isTruncated pr="20px" mr="20px">
        <Heading isTruncated fontWeight="bold" textTransform="uppercase" fontSize="md" color="iris.100" p="0">
          Your Latest Notes <IconButton aria-label="Create new note" icon={<AddIcon />} onClick={() => createNew()} />
        </Heading>
        {populateNotesList()}
      </Box>
    </NotesListBox>
  );
};

export default NotesList;
{
  /* <Flex align="center" justify='space-between'>
      <Button onClick={onToggle}>Click Me</Button>
      <SlideFade in={isOpen} offsetX='10%' >
        <Box
          p='40px'
          color='white'
          mt='4'
          bg='teal.500'
          rounded='md'
          shadow='md'
          
        >
hello
        </Box>
      </SlideFade>
    </Flex> */
}

//box for delete
// <Box
// p='5px'
// color='white'
// mt='2'
// bg ='purple.200'
// rounded='md'
// shadow='md'
// >
// <HStack>
// <Circle size='40px' bg='red.300' color='white'>
// <DeleteIcon onClick={() => deleteNote(note.noteId)}/>
// </Circle>
// </HStack>
// </Box>
