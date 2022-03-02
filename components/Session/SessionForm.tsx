import { useEffect, useState } from 'react';
import {
  Input,
  Button,
  FormControl,
  Avatar,
  AvatarBadge,
  Center,
  Flex,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { useAuth } from '@/contexts/AuthContext';
import { BiBlock, BiRightArrow } from 'react-icons/bi';

const SessionForm = ({ complete }: any) => {
  const { user } = useAuth();
  const [colorValue, setColorValue] = useState('#e66465');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  return (
    <div style={{ height: '70vh', overflow: 'hidden' }}>
      <Flex justify="center" align="center" height="100%">
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Session Details
          </Heading>
          <FormControl id="displayName" isRequired>
            <FormLabel>Display name</FormLabel>
            <Input
              placeholder={displayName}
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </FormControl>
          <FormControl id="color" isRequired>
            <FormLabel>User colour</FormLabel>
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
          <FormControl id="password" isRequired>
            <FormLabel>Session Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button colorScheme="fuschia" variant="outline" leftIcon={<BiBlock />} isFullWidth>
              Cancel
            </Button>
            <Button
              isFullWidth
              bg={useColorModeValue('iris.100', 'iris.200')}
              variant="solid"
              rightIcon={<BiRightArrow />}
              onClick={() => complete({ color: colorValue, name: displayName, password })}
            >
              Join
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </div>
  );
};

export default SessionForm;
