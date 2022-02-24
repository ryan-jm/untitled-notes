import { ChevronRightIcon, EditIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Center,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import DarkModeSwitch from './DarkModeSwitch';

const Header = () => {
  const { user, login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.accessToken) {
      router.push('/create');
    }
  }, [user?.accessToken, router]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex p="10px" pl="20px" pr="20px" w="100%" justify="space-between" align="center">
        <Center>
          <Heading color="text" size="sm">
            <NextLink href={'/'} passHref>
              <Link>
                <Heading size="lg">
                  <span id="untitled">Untitled Notes</span>
                </Heading>
              </Link>
            </NextLink>
          </Heading>
        </Center>
        <Box>
          <HStack>
            {/* Auth Modal */}
            {!user?.accessToken ? (
              <Button onClick={onOpen} variant={'primary'} size="md" mr="10px" leftIcon={<ChevronRightIcon />}>
                Get Started
              </Button>
            ) : (
              ''
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Please sign in...</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Button onClick={() => login()} variant={'primary'} leftIcon={<FcGoogle />}>
                    Sign in with Google
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
            {/* End Auth Modal */}

            {user?.accessToken ? (
              <>
                <NextLink href={'/create'} passHref>
                  <Link>
                    <Button variant="primary" size="md" leftIcon={<EditIcon />}>
                      Create
                    </Button>
                  </Link>
                </NextLink>

                <Menu>
                  <MenuButton as={Button} rounded={'full'} variant={'avatar'}>
                    <Avatar size={'sm'} src={user?.photoURL} />
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title={user?.displayName}>
                      <MenuItem
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => router.push('/dashboard')}
                      >
                        Dashboard
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          logout();
                          router.push('/');
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </>
            ) : (
              ''
            )}

            <DarkModeSwitch />
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
