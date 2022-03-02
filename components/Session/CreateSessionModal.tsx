import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  Heading,
  VStack,
  Spacer,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNoteContext } from '@/contexts/NoteContext';
import { BiRightArrow } from 'react-icons/bi';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Collaborate from '../svgs/collaborate';
import { db } from '../../firebase/clientApp';

const CreateSessionModal = ({ isOpen, setShowModal }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { currentNote } = useNoteContext();
  const [colorValue, setColorValue] = useState('#e66465');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const onClose = () => {
    setShowModal(false);
  };

  const createSession = () => {
    const sessionDbActions = async () => {
      const sessionRef = doc(db, 'sessions', currentNote.noteId);
      const dbEntry = {
        owner: user.uid,
        owner_display_name: displayName,
        owner_color: colorValue,
        note: currentNote,
        password: password,
        created_at: Timestamp.fromDate(new Date(Date.now())),
      };
      await setDoc(sessionRef, dbEntry);
      return;
    };

    setIsLoading(true);
    sessionDbActions().then(() => {
      // Redirect to the session page.
      router.push(`/session/${currentNote.noteId}`);
    });
  };

  return (
    <Modal
      size={'4xl'}
      isOpen={isOpen || isLoading}
      onClose={!isLoading ? onClose : () => {}}
      isCentered={true}
      motionPreset="slideInBottom"
    >
      <ModalOverlay backdropFilter="auto" backdropInvert="20%" backdropBlur="5px" />
      <ModalContent padding={5}>
        <ModalCloseButton />
        <ModalBody>
          <Flex align="center" textAlign="left" justify="space-around">
            <Flex display={{ base: 'none', md: 'flex' }} p="0">
              <Collaborate w="400px" h="400px" p="0" />
            </Flex>
            <VStack spacing={3} textAlign="left">
              <Heading mb="4px" size={'md'}>
                Start Collaboration Session
              </Heading>
              <Spacer />
              <Spacer />
              <Spacer />

              <Heading mb="4px" size={'xs'} color="gray.400">
                Set session details...
              </Heading>

              <FormControl id="displayName" isRequired>
                <FormLabel fontSize="sm">Display name</FormLabel>
                <Input
                  placeholder={displayName}
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </FormControl>
              <Spacer />
              <FormControl id="color" isRequired>
                <FormLabel fontSize="sm">User colour</FormLabel>
                <InputGroup>
                  <Input
                    type="color"
                    value={colorValue}
                    onChange={(e) => setColorValue(e.target.value)}
                    htmlSize={4}
                    width={20}
                    padding="0"
                  />
                  <InputRightAddon pointerEvents="none">{colorValue}</InputRightAddon>
                </InputGroup>
              </FormControl>
              <Spacer />
              <FormControl id="password" isRequired>
                <FormLabel fontSize="sm">Session Password</FormLabel>
                <Input
                  placeholder="password"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                isLoading={isLoading}
                loadingText="Creating..."
                colorScheme="iris"
                variant="outline"
                rightIcon={<BiRightArrow />}
                disabled={!password.length || !displayName.length}
                onClick={() => createSession()}
              >
                Start
              </Button>
            </VStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateSessionModal;
