import { Center, Heading } from '@chakra-ui/react';

import { useNoteContext } from '../contexts/NoteContext';

export default function UserInfo() {
  const { notes } = useNoteContext();

  return (
    <Center>
      <Heading size="sm">Total Notes: {notes.length}</Heading>
    </Center>
  );
}
