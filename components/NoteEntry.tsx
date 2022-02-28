import { DeleteIcon } from '@chakra-ui/icons';
import { ScaleFade, Box, HStack, Circle, useDisclosure, Flex, SlideFade } from '@chakra-ui/react';
import { Button } from '@remirror/react';

const NoteEntry = ({ handleChange, note, deleteNote }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <div>
      {/* <Button onClick={() => handleChange(note)} onDrag={onToggle} draggable="true" >{note.title}</Button> */}
      {/* <Button onClick={onToggle}>{note.title}</Button>  */}
      {/* <ScaleFade initialScale={0.1} in={isOpen}> */}
      {/* <Box
            p='5px'
            color='white'
            mt='2'
            bg ='purple.200'
            rounded='md'
            shadow='md'
        >
          <HStack>
  <Circle size='40px' bg='red.300' color='white'>
    <DeleteIcon onClick={() => deleteNote(note.noteId)}/>
  </Circle>
</HStack>
        </Box>
      </ScaleFade> */}

      <Flex align="center" justify="space-between">
        <Button onClick={() => handleChange(note)} onDrag={onToggle} draggable="true">
          {note.title}
        </Button>
        <SlideFade in={isOpen} offsetX="15%">
          <Box p="5px" color="white" mt="2" bg="purple.200" rounded="md" shadow="md">
            <HStack>
              <Circle size="40px" bg="red.300" color="white">
                <DeleteIcon onClick={() => deleteNote(note.noteId)} />
              </Circle>
            </HStack>
          </Box>
        </SlideFade>
      </Flex>
    </div>
  );
};

export default NoteEntry;
