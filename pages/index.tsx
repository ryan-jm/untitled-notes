import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { Button, Flex, Text, Box, Stack, Center, Heading, VStack } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '../contexts/AuthContext';

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function Home() {
  const { user, logout } = useAuth();

  const router = useRouter();

  function login() {
    router.push('/auth');
  }

  return (
    <Center>
      <VStack>
        <Flex wrap={'wrap'} pt="10vh" justify={'center'}>
          <Flex
            direction={'column'}
            align={'center'}
            justify="center"
            m="5vw"
            bg="transparent"
            width={{ base: '250px', md: '500px' }}
            height={{ base: '200px', md: '400px' }}
          >
            <Box>
              <Heading fontSize={{ base: '24px', md: '40px', lg: '56px' }}>
                Make capturing your thoughts <span id="easy">easy</span>
              </Heading>
            </Box>
          </Flex>
          <Flex>
            <Box
              m="5vw"
              width={{ base: '250px', md: '500px' }}
              height={{ base: '200px', md: '400px' }}
              bgColor={'transparent'}
              borderRadius={'35px'}
              boxShadow={'-80px 80px 500px #7879F1'}
              zIndex={-1}
            ></Box>
            <Box
              m="5vw"
              width={{ base: '250px', md: '500px' }}
              height={{ base: '200px', md: '400px' }}
              bgColor={'transparent'}
              borderRadius={'35px'}
              boxShadow={'40px -40px 500px #F178B6'}
              position="absolute"
            ></Box>
          </Flex>
        </Flex>

        <Flex p="50px">
          <Button onClick={() => login()} variant={'primary'} leftIcon={<FcGoogle />}>
            Sign in with Google
          </Button>
        </Flex>
      </VStack>
    </Center>
  );
}
