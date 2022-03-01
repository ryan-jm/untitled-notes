import { useState, useEffect } from 'react';

import { Heading, Flex } from '@chakra-ui/react';

import TagSearch from '@/components/TagSearch';
import UserInfo from '../components/UserInfo';
import NoteCard from '../components/NoteCard';

import { useAuth } from '../contexts/AuthContext';
import { useNoteContext } from '../contexts/NoteContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { notes, tags } = useNoteContext();

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

  return (
    <>
      <Heading textAlign="center" size="xl">
        {user?.displayName ? <span className="gradient">{`${user.displayName.split(' ')[0]}'s Dashboard`}</span> : ''}
      </Heading>

      <UserInfo />

      <TagSearch tagsArray={tagsArray} setTagFilter={setTagFilter} />

      <Flex wrap={'wrap'} justify={'center'}>
        {taggedNotes.map((note) => {
          return <NoteCard key={note.noteId} note={note} />;
        })}
      </Flex>
    </>
  );
}
