import { Heading, Flex } from '@chakra-ui/react';

import TagSearch from '@/components/TagSearch';
import UserInfo from '../components/UserInfo';
import NoteCard from '../components/NoteCard';

import { useAuth } from '../contexts/AuthContext';
import { useNoteContext } from '../contexts/NoteContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { notes } = useNoteContext();

  console.log(notes[0].tags);

  return (
    <>
      <Heading textAlign="center" size="xl">
        {user?.displayName ? <span className="gradient">{`${user.displayName.split(' ')[0]}'s Dashboard`}</span> : ''}
      </Heading>
      <UserInfo />
      <TagSearch />

      <Flex wrap={'wrap'} justify={'center'}>
        {notes.map((note) => {
          return <NoteCard key={note.noteId} note={note} />;
        })}
      </Flex>
    </>
  );
}
