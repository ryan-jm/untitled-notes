import { useState, useEffect } from 'react';

import { Heading, Flex, Box } from '@chakra-ui/react';

import { AnimatePresence, motion } from 'framer-motion';

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
    const filterTags = new Set(
      tags
        .filter((tag) => tag.noteRef !== undefined)
        .map((tag) => {
          const niceTag = tag;
          console.log(tag.label.substring(1));

          return tag.label.substring(1);
        })
    );

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
      return note.tags.some((elem: any) => elem.label.substring(1) === tagFilter);
    });

    return filterNotes;
  }

  function checkDisplayName() {
    if (/\s/g.test(user?.displayName)) return true;
  }

  const MotionBox = motion(Box);

  return (
    <>
      <Heading textAlign="center" size="xl">
        {user?.accessToken ? (
          <span className="gradient">{`${
            checkDisplayName() ? user?.displayName.split(' ')[0] : user?.email
          }'s Dashboard`}</span>
        ) : (
          ''
        )}
      </Heading>

      <UserInfo />

      <TagSearch tagsArray={tagsArray} setTagFilter={setTagFilter} />

      <Flex wrap={'wrap'} justify={'center'}>
        <AnimatePresence>
          {taggedNotes.map((note, index) => {
            // @ts-ignore
            return (
              <MotionBox whileHover={{ scale: [1, 1.05, 1] }} key={index}>
                {
                  //@ts-ignore
                  <NoteCard key={note.noteId} note={note} />
                }
              </MotionBox>
            );
          })}
        </AnimatePresence>
      </Flex>
    </>
  );
}
