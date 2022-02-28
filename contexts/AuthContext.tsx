import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { createContext, useContext, useState } from 'react';

import { auth } from '../firebase/clientApp';

interface IAuthContext {
  user: any;
  login?: (type) => Promise<void>;
  logout?: () => void;
}

const initialState = {
  user: null,
};

const provider = new GoogleAuthProvider();

const providerGithub = new GithubAuthProvider();

const UserContext = createContext<IAuthContext>(initialState);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(() => user);
    }
  });

  const login = async (type) => {
    try {
      await setPersistence(auth, browserLocalPersistence);

      let res = await signInWithPopup(auth, provider);
      let credential = GoogleAuthProvider.credentialFromResult(res);

      if (type === 'Github') {
        res = await signInWithPopup(auth, providerGithub);
        credential = GithubAuthProvider.credentialFromResult(res);
      }

      const token = credential?.accessToken;
      const user = res.user;

      console.log('USER --->', user);

      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => setUser(null))
      .then(() => window.location.reload());
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export const useAuth = () => useContext(UserContext);

export default AuthProvider;
