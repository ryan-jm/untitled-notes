import React, { useEffect, useState } from 'react';
import { Box, Heading, useStyleConfig, IconButton } from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import TagSearch from '@/components/TagSearch';

import { deleteDoc, doc } from 'firebase/firestore';
import { useNoteContext } from '../contexts/NoteContext';
import { db } from '../firebase/clientApp';
import NoteEntry from './NoteEntry';

const NotesList = ({ forceLoad, createNew }: any) => {
  const { notes, tags, setEditing } = useNoteContext();

  //for filtering the Note card list
  const [tagFilter, setTagFilter] = useState('');
  const [taggedNotes, setTaggedNotes] = useState([]);

  const [tagsArray, setTagsArray] = useState([]);

  function generateUniqueTagList() {
    const filterTags = new Set(tags.filter((tag) => tag.noteRef !== undefined).map((tag) => tag.label));

    const filterTagsArray = Array.from(filterTags);

    return filterTagsArray;
  }

  useEffect(() => {
    setTagsArray(() => generateUniqueTagList());

    if (!tagFilter) {
      setTaggedNotes(notes);
    } else if (tagFilter) {
      setTaggedNotes(() => getFilteredNotes());
    }
  }, [tagFilter, notes]);

  function getFilteredNotes() {
    const filterNotes = notes.filter((note) => {
      return note.tags.some((elem: any) => elem.label === tagFilter);
    });

    return filterNotes;
  }

  const handleChange = (note) => {
    setEditing(() => note.noteId);
    forceLoad(note);
  };

  function deleteNote(id) {
    const deleteDocument = doc(db, 'notes', id);
    deleteDoc(deleteDocument);
  }

  function populateNotesList() {
    return taggedNotes
      ? taggedNotes.reverse().map((note, index) => {
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
        <TagSearch tagsArray={tagsArray} setTagFilter={setTagFilter} />

        {populateNotesList()}
      </Box>
    </NotesListBox>
  );
};

export default NotesList;
