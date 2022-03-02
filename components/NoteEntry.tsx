/* eslint-disable react/display-name */
import {
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton,
  Text,
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';

import { useRef, useState } from 'react';

const NoteEntry = ({ handleChange, note, deleteNote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  return (
    <Flex justify={'space-between'}>
      <Button mb="5px" variant={'notelistTitleButton'} size="sm" w="150px" onClick={() => handleChange(note)}>
        <Text isTruncated>{note.title}</Text>
      </Button>

      <IconButton
        size="sm"
        aria-label="Delete note"
        variant={'cardDeleteButton'}
        icon={<DeleteIcon />}
        onClick={() => setIsOpen(true)}
      />

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
    </Flex>
  );
};

export default NoteEntry;
