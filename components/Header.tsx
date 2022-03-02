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
  ModalBody,
  ModalCloseButton,
  IconButton,
  Box,
  useToast,
} from '@chakra-ui/react';
import { ChevronRightIcon, EditIcon } from '@chakra-ui/icons';

import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DarkModeSwitch from './DarkModeSwitch';

import Illustration from './svgs/illustration';
import GoogleLogo from './svgs/google-svgrepo-com';
import GitHubLogo from './svgs/github';

const Header = () => {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const { asPath } = useRouter();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignIn = (type?: string) => {
    login(type).then(() => {
      onClose();
    });
  };

  function checkDisplayName() {
    if (/\s/g.test(user?.displayName)) return true;
  }

  console.log(user);

  useEffect(() => {
    user?.accessToken
      ? toast({
          title: 'Success',
          description: `You are logged in as ${checkDisplayName() ? user?.displayName.split(' ')[0] : user?.email}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      : '';
  }, [user?.accessToken]);
  console.log(user);

  const noteQuery = router.query.noteId;

  const MotionBox = motion(Box);

  return (
    <>
      <Grid templateColumns={'repeat(3, 1fr)'} p={{ base: '20px', md: '40px' }}>
        <GridItem>
          <MotionBox whileHover={{ skew: [0, -10, 10, 0], scale: [1, 1.05, 1] }}>
            <Heading color="text">
              <NextLink href={'/'} passHref>
                <Link>
                  <Heading fontSize={{ base: '16px', md: '40px' }}>
                    <span id="untitled">Untitled Notes</span>
                  </Heading>
                </Link>
              </NextLink>
            </Heading>
          </MotionBox>
        </GridItem>

        <GridItem textAlign={'center'}>
          {/* Auth Modal, ternary logic to only show button when not logged in */}
          {!user?.accessToken ? (
            <Button onClick={onOpen} variant={'primary'} size="md" mr="10px" leftIcon={<ChevronRightIcon />}>
              Get Started
            </Button>
          ) : (
            ''
          )}

          <Modal size={'3xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter="auto" backdropInvert="20%" backdropBlur="5px" />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <Flex>
                  <Flex display={{ base: 'none', md: 'flex' }} p="0">
                    <Illustration w="400px" h="400px" p="0" />
                  </Flex>
                  <Flex textAlign="left" mt="50px" direction={'column'}>
                    <Heading mb="4px" size={'md'}>
                      Create Account Or Sign In
                    </Heading>
                    <Heading size={'xs'} color="gray.400">
                      Expand on your thoughts today.
                    </Heading>
                    <br />
                    <br />

                    <Heading mb="4px" size={'xs'} color="gray.400">
                      Continue with...
                    </Heading>
                    <Box pb="50px">
                      <IconButton
                        size="lg"
                        onClick={() => handleSignIn()}
                        variant={'primary'}
                        aria-label="Google Login"
                        icon={<GoogleLogo />}
                      />

                      <IconButton
                        size="lg"
                        onClick={() => handleSignIn('Github')}
                        variant={'primary'}
                        aria-label="Github Login"
                        icon={<GitHubLogo />}
                      />
                    </Box>
                  </Flex>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* End Auth Modal */}

          {/* Nested ternary logic to only display when user is logged in, also display different center buttons depending on page */}
          {user?.accessToken ? (
            asPath === '/create' || asPath === `/create?noteId=${noteQuery}` ? (
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
