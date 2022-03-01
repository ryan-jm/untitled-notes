import React, { useEffect } from 'react';
import { Box, Heading, useStyleConfig, IconButton } from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { useRouter } from 'next/router';

import { deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useNoteContext } from '../contexts/NoteContext';
import { db } from '../firebase/clientApp';
import NoteEntry from './NoteEntry';

const NotesList = ({ forceLoad, createNew }: any) => {
  const { notes, setEditing } = useNoteContext();

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
      ? notes.reverse().map((note, index) => {
          return (
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
          Your Latest Notes
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Create new note"
            icon={<AddIcon />}
            onClick={() => createNew()}
          />
        </Heading>
        {populateNotesList()}
      </Box>
    </NotesListBox>
  );
};

export default NotesList;
