import { GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

import { auth } from '../firebase/clientApp';

interface IAuthContext {
  user: any;
  login?: () => Promise<void>;
  logout?: () => void;
}

const initialState = {
  user: null,
};

const provider = new GoogleAuthProvider();
const UserContext = createContext<IAuthContext>(initialState);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(() => user);
    }
  });

  const login = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    auth.signOut().then(() => {
      setUser(() => null);
    });
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export const useAuth = () => useContext(UserContext);

export default AuthProvider;
