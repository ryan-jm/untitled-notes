import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext';

const SignInPage = () => {
  const { user, login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.accessToken) {
      router.push('/create');
    }
  }, [router, user]);

  return (
    <div
      style={{
        maxWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Test Login</h1>
      <p>Please sign in:</p>
      <button onClick={() => login()}>Sign in with google</button>
    </div>
  );
};

export default SignInPage;
