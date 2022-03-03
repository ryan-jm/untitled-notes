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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

import { motion } from 'framer-motion';

import { EditIcon, DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { deleteDoc, doc } from 'firebase/firestore';
import { useState, useRef, memo } from 'react';
import { db } from '../firebase/clientApp';

// eslint-disable-next-line react/display-name
const NoteCard = memo(
  (props) => {
    // @ts-ignore
    const { note } = props;

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    const router = useRouter();
    const dateTime = new Date(note.created_at.seconds * 1000).toLocaleString('en-GB', { timeZone: 'UTC' });

    // array with every node note.content.content
    const nodeContent = [...note.content.content];
    nodeContent.shift();

    const getNoteBody = nodeContent.map((elem, index) => {
      return elem.content && elem.content[0] ? <p key={index}>{elem.content[0].text}</p> : '';
    });

    const deleteNote = (id) => {
      const collectionById = doc(db, 'notes', id);
      deleteDoc(collectionById);
    };

    const MotionCenter = motion(Center);

    return (
      <MotionCenter p={6} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} layout>
        <Box
          maxW={'270px'}
          w={'270px'}
          h={'350px'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'5px 8px 12px #7879F1'}
          rounded={'md'}
          overflow={'hidden'}
        >
          <Grid h="100%" templateColumns="1" templateRows={'repeat(4, 1fr)'} p={4} position="relative">
            <GridItem>
              <Box p="" position="absolute" left="15px" top="15px">
                <IconButton
                  size="sm"
                  aria-label="Edit note"
                  variant={'cardEditButton'}
                  icon={<EditIcon />}
                  onClick={() => router.push(`/create?noteId=${note.noteId}`)}
                />
              </Box>
              <br />

              <Box p="" position="absolute" right="15px" top="15px">
                <IconButton
                  size="sm"
                  aria-label="Delete note"
                  variant={'cardDeleteButton'}
                  icon={<DeleteIcon />}
                  onClick={() => setIsOpen(true)}
                />
              </Box>
              <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete Note
                    </AlertDialogHeader>

                    <AlertDialogBody>Are you sure? You can not undo this action afterwards.</AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        variant={'cardDeletePopUpButton'}
                        ml={3}
                        onClick={() => {
                          onClose();
                          deleteNote(note.noteId);
                        }}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>

              <Stack
                spacing={0}
                align={'center'}
                mb={5}
                overflow="hidden"
                whiteSpace={'nowrap'}
                width="200px"
                noOfLines={1}
              >
                <Heading mt="20px" pb="15px" fontSize={'2xl'} isTruncated>
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
                      <IconButton
                        aria-label={'stuff'}
                        size="xs"
                        variant={'cardTagsButton'}
                        icon={<ChevronDownIcon />}
                      />
                    </PopoverTrigger>

                    <PopoverContent w="250px">
                      <PopoverArrow />
                      <Box textAlign={'center'}>
                        <PopoverBody>
                          {note.tags.length ? (
                            note.tags.map((tag, index) => {
                              return <Link key={index}>{tag.label.substring(1)}&nbsp;</Link>;
                            })
                          ) : (
                            <p>None</p>
                          )}
                        </PopoverBody>
                      </Box>
                    </PopoverContent>
                  </Popover>
                </Flex>

                <Flex noOfLines={1}>
                  <p>Tags</p>
                </Flex>
              </HStack>

              <Grid pt="10px" noOfLines={3} templateColumns="">
                <Text fontSize={'sm'}>Date: {dateTime}</Text>
              </Grid>
            </GridItem>
          </Grid>
        </Box>
      </MotionCenter>
    );
  },
  //@ts-ignore
  (next, prev) => next.note === prev.note
);

export default NoteCard;
