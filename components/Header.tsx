import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';

const Links = ['Dashboard', 'Projects', 'Team'];
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function goToAuth() {
    if (!user?.accessToken) router.push('/auth');
    else logout();
  }
  //    console.log(Object.keys(user?));
  console.log(user, 'userrrrrr');

  return (
    <>
      <h1>Headerrrrrr</h1>
      <button onClick={goToAuth}>{!user?.accessToken ? 'Login' : 'Logout'}</button>
      <p>
        {user?.accessToken ? 'User:' : ''} {user?.displayName}
      </p>
      <img src={user?.photoURL} />
      <br /> <br />
    </>
  );
};

export default Header;
