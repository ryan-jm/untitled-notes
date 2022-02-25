import { Heading, Flex } from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext';

import NoteCard from '../components/NoteCard';

import { useNoteContext } from '../contexts/NoteContext';

const noteInfo = [
  {
    title: 'Note1 Title',
    content: 'Note 1 Note 1 Note 1 Note 1 Note 1 Note 1 Note 1 Note 1 Note 1 Note 1 Note 1 ',
    created_at: 'Sometime 2022',
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
  },
  {
    title: 'Note2 Title',
    content: 'Note 2 Note 2 Note 2 Note 2 Note 2 Note 2 Note 2 Note 2 Note 2 Note 2 Note 2 ',
    created_at: 'Sometime 2022',
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
  },
  {
    title: 'Note3 Title',
    content:
      'Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 Note 3 ',
    created_at:
      'Sometime 2022 09udf09uasd09uifa0sdflkajsdl;kja;dlsfkja;lskdjf;alksdjf;lakjsdf;lkajsdf;lkajsd;flkj9fuia0s9dfu09d',
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
  },
  {
    title: 'Note4 Title',
    content: 'Note 4',
    created_at: 'Sometime 2022',
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
  },
  {
    title: 'Note5 Title',
    content: 'Note 5',
    created_at: 'Sometime 2022',
    tags: ['tag1'],
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { notes } = useNoteContext();

  return (
    <>
      <Heading textAlign="center" size="xl">
        {user?.displayName ? <span className="gradient">{`${user.displayName}'s Dashboard`}</span> : ''}
      </Heading>

      <Flex wrap={'wrap'} justify={'center'}>
        {noteInfo.map((note) => {
          return <NoteCard key={note.title} note={note} />;
        })}
      </Flex>
    </>
  );
}
