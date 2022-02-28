import { Center } from '@chakra-ui/react';

import { useNoteContext } from '../contexts/NoteContext';

export default function UserInfo() {
  const { notes } = useNoteContext();

  return (
    <Center>
      <p>Total Notes: {notes.length}</p>
    </Center>
  );
}
