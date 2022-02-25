import React, { useState, useEffect } from 'react';

import { Box, Heading, Divider, useStyleConfig, IconButton } from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { useRouter } from 'next/router';

import { useAuth } from '../contexts/AuthContext';
import { useNoteContext } from '../contexts/NoteContext';

const NotesList = ({ forceLoad, createNew }: any) => {
  const [displayName, setDisplayName] = useState('');
  const { notes, setEditing } = useNoteContext();
  const { user } = useAuth();
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

  function populateNotesList() {
    return notes
      ? notes.map((note) => {
          if (note.title) {
            return (
              <Box isTruncated pt="20px">
                <Heading isTruncated fontSize="md" onClick={() => handleChange(note)}>
                  {note.title}{' '}
                  <IconButton aria-label="Create new note" icon={<AddIcon />} onClick={() => createNew()} />
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
        </Heading>
        {populateNotesList()}
      </Box>
    </NotesListBox>
  );
};

export default NotesList;
