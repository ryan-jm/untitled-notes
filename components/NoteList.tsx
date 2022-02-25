import React, { useState, useEffect } from 'react';
import { collection, getDocsFromServer, query, where, orderBy, limit } from 'firebase/firestore';

import { Box, Heading, Divider, useStyleConfig } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/clientApp';

const NotesList = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<any>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!user?.accessToken) {
      router.push('/auth');
    } else {
      if (!notes) {
        const listUserNotes = query(
          collection(db, 'notes'),
          where('user', '==', user.uid),
          orderBy('created_at', 'desc'),
          limit(3)
        );
        getDocsFromServer(listUserNotes).then((data) => {
          console.log('data : ', data);
          const notesArr = [];
          data.forEach((doc) => {
            notesArr.push(doc.data());
          });
          setNotes(notesArr);
        });
      }
    }
  }, []);

  function NotesListBox(props) {
    const { size, variant, ...rest } = props;
    const styles = useStyleConfig('NotesListBox', { size, variant });
    return <Box as="span" sx={styles} {...rest} />;
  }

  function populateNotesList() {
    return notes
      ? notes.map((note) => {
          if (note.content.content[0].content && note.content.content[0].content[0]?.text) {
            return (
              <Box isTruncated pt="20px">
                <Heading isTruncated fontSize="md">
                  {note.content.content[0].content[0].text}
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
