import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { Button } from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext';

const SignInPage = () => {
  const { user, login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.accessToken) {
      router.push('/dashboard');
    }
  }, [router, user]);

  return (
    <div>
      <p>Please sign in:</p>
      <Button onClick={() => login()} variant={'primary'} leftIcon={<FcGoogle />}>
        Sign in with Google
      </Button>
    </div>
  );
};

export default SignInPage;
