import { Flex, Box, Center, Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <Center>
      <Flex wrap={'nowrap'} direction={{ base: 'column', md: 'row' }} mt="5vh" justify={'center'}>
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
              Make capturing your thoughts <span className="gradient">easy</span>
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
            boxShadow={'-80px 100px 500px #7879F1'}
            zIndex={-1}
          ></Box>
          <Box
            m="5vw"
            width={{ base: '250px', md: '500px' }}
            height={{ base: '200px', md: '400px' }}
            bgColor={'transparent'}
            borderRadius={'35px'}
            boxShadow={'80px -100px 500px #F178B6'}
            position="absolute"
          ></Box>
        </Flex>
      </Flex>
    </Center>
  );
}
