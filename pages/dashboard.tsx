import { Heading } from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Heading textAlign="center" size="xl">
      {user?.displayName ? user.displayName + "'s Dashboard" : ''}
    </Heading>
  );
}
