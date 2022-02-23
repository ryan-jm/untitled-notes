import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, ReactElement } from 'react';

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
                Make capturing your thoughts <span id="gradient">easy</span>
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

    // <SimpleGrid columns={{ base: 1, md: 2 }} p={'10%'} pt="20vh" spacing={'50px'} backgroundColor={'transparent'}>
    //   <Center
    //     alignContent={'center'}
    //     pb="200px"
    //     m={'auto'}
    //     bgColor={'transparent'}
    //     width={'40vw'}
    //     height={'30vh'}
    //     minW="200px"
    //     minH="150px"
    //   >
    //     <Heading size="2xl">Make capturing your thoughts easy</Heading>
    //   </Center>
    //   <Center>
    //     <Box
    //       m={'auto'}
    //       width={'40vw'}
    //       height={'30vh'}
    //       bgColor={'transparent'}
    //       borderRadius={'35px'}
    //       boxShadow={'-50px 80px 4500px #7879F1'}
    //       minW="200px"
    //       minH="150px"
    //       zIndex={-1}
    //       position="absolute"
    //     ></Box>
    //     <Box
    //       m={'auto'}
    //       width={'40vw'}
    //       height={'30vh'}
    //       bgColor={'transparent'}
    //       borderRadius={'35px'}
    //       minW="200px"
    //       minH="150px"
    //       boxShadow={'30px -30px 4500px #F178B6'}
    //       position="absolute"
    //     ></Box>
    //   </Center>
    // </SimpleGrid>
  );
}
