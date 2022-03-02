import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  AuthProvider,
} from 'firebase/auth';
import { Router, useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { auth } from '../firebase/clientApp';

interface IAuthContext {
  user: any;
  login?: (type) => Promise<void>;
  logout?: () => void;
}

const initialState = {
  user: null,
};

const UserContext = createContext<IAuthContext>(initialState);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      user['session'] = null;
      setUser(() => user);
    }
  });

  const toast = useToast();
  const router = useRouter();
  const login = async (type?: string) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      let provider: AuthProvider;

      switch (type) {
        default:
          provider = new GoogleAuthProvider();
          break;
        case 'Github':
          provider = new GithubAuthProvider();
          break;
      }

      let res = await signInWithPopup(auth, provider);
      const user = res.user;
      user['session'] = null;
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => setUser(null))
      .then(() => {
        toast({
          title: 'Logged out',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      })
      .then(() => {
        router.push('/');
      });
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export const useAuth = () => useContext(UserContext);

export default AuthProvider;
