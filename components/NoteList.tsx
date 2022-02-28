import React from 'react';

import { Box, Link, Heading, Divider, useStyleConfig, IconButton } from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { useNoteContext } from '../contexts/NoteContext';

const NotesList = ({ forceLoad, createNew }: any) => {
  const { notes, setEditing } = useNoteContext();

  const handleChange = (note) => {
    console.log('noteList', note);

    setEditing(() => note.noteId);
    forceLoad(note);
  };

  function populateNotesList() {
    return notes
      ? notes.reverse().map((note, index) => {
          return (
            <Box key={index} isTruncated pt="20px">
              <Heading isTruncated fontSize="md">
                <Link key={note.noteId} onClick={() => handleChange(note)}>
                  {note.title}
                </Link>

                <Divider />
              </Heading>
            </Box>
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
          Your Latest Notes{' '}
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
