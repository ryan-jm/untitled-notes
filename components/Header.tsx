import {
  Avatar,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ChevronRightIcon, EditIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';

import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { useAuth } from '../contexts/AuthContext';
import DarkModeSwitch from './DarkModeSwitch';

const Header = () => {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const { asPath } = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignIn = () => {
    login().then(() => {
      router.push('/create');
      onClose();
    });
  };

  return (
    <>
      <Grid templateColumns={'repeat(3, 1fr)'} p={{ base: '20px', md: '40px' }}>
        <GridItem>
          <Heading color="text">
            <NextLink href={'/'} passHref>
              <Link>
                <Heading fontSize={{ base: '16px', md: '40px' }}>
                  <span id="untitled">Untitled Notes</span>
                </Heading>
              </Link>
            </NextLink>
          </Heading>
        </GridItem>

        <GridItem textAlign={'center'}>
          {/* Auth Modal, ternary logic to only show when not logged in */}
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
                <Button onClick={() => handleSignIn()} variant={'primary'} leftIcon={<FcGoogle />}>
                  Sign in with Google
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* End Auth Modal */}

          {/* Nested ternary logic to only display when user is logged in, also display different center buttons depending on page */}
          {user?.accessToken ? (
            asPath === '/create' ? (
              <NextLink href={'/dashboard'} passHref>
                <Link>
                  <Button variant="primary" size="md" leftIcon={<EditIcon />}>
                    Dashboard
                  </Button>
                </Link>
              </NextLink>
            ) : (
              <NextLink href={'/create'} passHref>
                <Link>
                  <Button variant="primary" size="md" leftIcon={<EditIcon />}>
                    Create
                  </Button>
                </Link>
              </NextLink>
            )
          ) : (
            ''
          )}
          {/* End center buttons */}
        </GridItem>

        <GridItem>
          <Flex direction={'row'} justify={'end'}>
            {/* Ternary logic to display avatar only when user is logged in */}
            {user?.accessToken ? (
              <>
                <Menu>
                  <MenuButton ml="10px" mr="10px" as={Button} rounded={'full'} variant={'avatar'}>
                    <Avatar size={'sm'} src={user?.photoURL} />
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title={user?.displayName}>
                      <MenuItem
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          logout();
                          router.push('/');
                        }}
                      >
                        <ChevronRightIcon />
                        Logout
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </>
            ) : (
              ''
            )}
            {/* End avatar section */}

            <DarkModeSwitch />
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default Header;
