import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createContext, useContext, useState } from 'react';

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

  const login = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential?.accessToken;
      const user = res.user;
      setUser(user);

      console.log({ credential, token, user });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
    console.log('Logged out.');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

export default AuthProvider;
