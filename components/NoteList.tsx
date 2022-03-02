import React from 'react';
import { Box, Heading, useStyleConfig, IconButton, Flex } from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import TagSearch from '@/components/TagSearch';

import { deleteDoc, doc } from 'firebase/firestore';
import { useNoteContext } from '../contexts/NoteContext';
import { db } from '../firebase/clientApp';
import NoteEntry from './NoteEntry';

const NotesList = ({ tagsArray, taggedNotes, setTagFilter, forceLoad, createNew }: any) => {
  const { setEditing } = useNoteContext();

  const handleChange = (note) => {
    setEditing(() => note.noteId);
    forceLoad(note);
  };

  function deleteNote(id) {
    const deleteDocument = doc(db, 'notes', id);
    deleteDoc(deleteDocument);
  }

  function NotesListBox(props) {
    const { size, variant, ...rest } = props;
    const styles = useStyleConfig('NotesListBox', { size, variant });
    return <Box as="span" sx={styles} {...rest} />;
  }

  return (
    <NotesListBox isTruncated>
      <Box h="min-content" isTruncated pr="20px" mr="20px">
        <Flex justifyContent={'left'} textAlign={'left'}>
          {tagsArray ? <TagSearch tagsArray={tagsArray} setTagFilter={setTagFilter} /> : ''}
        </Flex>
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

        {taggedNotes
          ? taggedNotes.reverse().map((note, index) => {
              return (
                <div key={note.noteId}>
                  {
                    // @ts-ignore
                    <NoteEntry key={note.noteId} handleChange={handleChange} note={note} deleteNote={deleteNote} />
                  }
                </div>
              );
            })
          : undefined}
      </Box>
    </NotesListBox>
  );
};

export default NotesList;
