import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext';
import GoogleButton from '../components/GoogleButton';

const SignInPage = () => {
  const { user, login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.accessToken) {
      router.push('/create');
    }
  }, [router, user]);

  return (
    <div>
      <p>Please sign in:</p>
      <button onClick={() => login()}>
        <GoogleButton />
      </button>
    </div>
  );
};

export default SignInPage;
