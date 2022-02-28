import {
  Heading,
  Link,
  Box,
  Center,
  HStack,
  Grid,
  GridItem,
  Flex,
  Text,
  Stack,
  IconButton,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';

import { EditIcon, DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/clientApp';

export default function NoteCard({ note }) {
  // const note = note;
  // console.log('note>>>>>', note.noteId);

  // const { title, content, created_at, tags } = note.note;
  const router = useRouter();
  const dateTime = new Date(note.created_at.seconds * 1000).toLocaleString('en-GB', { timeZone: 'UTC' });

  // array with every node note.content.content
  const nodeContent = [...note.content.content];
  nodeContent.shift();

  const getNoteBody = nodeContent.map((elem, index) => {
    console.log('element>>>>');

    // return <p>{elem.content[0].text}</p>;
  });
  const deleteNote = (id) => {
    const collectionById = doc(db, 'notes', id);
    deleteDoc(collectionById).then(() => {
      console.log('id>>>>', id);
      window.location.reload();
    });
  };

  return (
    <Center p={6}>
      <Box
        maxW={'270px'}
        w={'270px'}
        h={'350px'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'5px 5px 10px #7879F1'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Grid h="100%" templateColumns="1" templateRows={'repeat(4, 1fr)'} p={4} position="relative">
          <GridItem>
            <Box p="" position="absolute" left="15px" top="15px">
              <IconButton
                size="sm"
                variant={'cardButtons'}
                icon={<EditIcon onClick={() => router.push('/create')} />}
              />
            </Box>
            <br />

            <Box p="" position="absolute" right="15px" top="15px">
              <IconButton
                size="sm"
                variant={'cardButtons'}
                icon={<DeleteIcon onClick={() => deleteNote(note.noteId)} />}
              />
            </Box>

            <Stack spacing={0} align={'center'} mb={5}>
              <Heading mt="20px" pb="15px" fontSize={'2xl'}>
                {note.title}
              </Heading>
            </Stack>
          </GridItem>

          <GridItem>
            <Text noOfLines={4} color={'gray.500'}>
              {getNoteBody}
            </Text>
          </GridItem>

          <GridItem w="230px" rowStart={4}>
            <HStack>
              <Flex>
                <Popover>
                  <PopoverTrigger>
                    <IconButton aria-label={'stuff'} size="xs" variant={'cardButtons'} icon={<ChevronDownIcon />} />
                  </PopoverTrigger>

                  <PopoverContent w="250px">
                    <PopoverArrow />
                    <Box textAlign={'center'}>
                      <PopoverBody>
                        {note.tags ? (
                          note.tags.map((tag, index) => {
                            return <Link key={index}>{tag}&nbsp;</Link>;
                          })
                        ) : (
                          <p>Tags</p>
                        )}
                      </PopoverBody>
                    </Box>
                  </PopoverContent>
                </Popover>
              </Flex>

              <Flex noOfLines={1}>
                {note.tags ? (
                  note.tags.map((tag, index) => {
                    return <Link key={index}>{tag}&nbsp;</Link>;
                  })
                ) : (
                  <p>Tags</p>
                )}
              </Flex>
            </HStack>

            <Grid pt="10px" noOfLines={3} templateColumns="">
              <Text fontSize={'sm'}>Date: {dateTime}</Text>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </Center>
  );
}
