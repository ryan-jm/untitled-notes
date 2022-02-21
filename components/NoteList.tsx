import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/clientApp';
import { addDoc, collection, getDocsFromServer, query, Timestamp, where, orderBy, limit } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, StackDivider, Button } from '@chakra-ui/react';

const NotesList = () => {
  const [displayName, SetDisplayName] = useState('');
  const [note, setNote] = useState('');
  const { user } = useAuth();

  const loadNote = async () => {
    // Currently loads the most recent note, but queries will remain useful for loading a list of all user-added notes.
    const totalNotes = [];
    const loadQuery = query(collection(db, 'notes'), where('user', '==', user.uid));
    const noteSnapshot = await getDocsFromServer(loadQuery);
    noteSnapshot.forEach((doc) => totalNotes.unshift(doc.data()));
    const doc = {
      type: 'doc',
      content: totalNotes[0].content.content,
    };

    const lastNoteQuery = query(
      collection(db, 'notes'),
      where('user', '==', user.uid),
      orderBy('created_at', 'desc'),
      limit(1)
    );

    const getLastNote = await getDocsFromServer(lastNoteQuery);
    const lastNote = getLastNote.docs[0].data();

    console.log('from notes list ', lastNote.content);

    console.table('from loadNote (prop)', doc.content[0].content[0].text);
    console.log('from loadNote (ob keys)', Object.keys(doc.content[0]));

    SetDisplayName(user.displayName);
    setNote(doc.content[0].content[0].text);
  };

  loadNote();

  return (
    <div>
      <VStack divider={<StackDivider borderColor="teal.800" />} spacing={4} align="stretch">
        <Box bgGradient={'linear(to-t, blue.200, teal.500)'} m="1" p="2" borderRadius="lg" h={80}>
          <Heading size="sm" p="1" mb="2">
            {displayName}'s Notes
          </Heading>
          <Text fontSize="sm" ml="1">
            <Button bg="teal.600" width="90%" size="sm">
              {note}
            </Button>
            <p>Some notes</p>
            <p>Some notes</p>
            <p>Some notes</p>
            <p>Some notes</p>
          </Text>
        </Box>
      </VStack>
    </div>
  );
};

export default NotesList;
