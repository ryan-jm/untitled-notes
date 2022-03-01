import { Flex, Box, Center, Heading, Button, Text, Tooltip } from '@chakra-ui/react';

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
            p={{ base: '24px', md: '40px' }}
          >
            <Heading fontSize={{ base: '24px', md: '40px' }}>Untitled</Heading>
            <Tooltip label="God help us, we're in the hands of engineers. - Jeffsum.com" aria-label="A tooltip">
              <Button variant={'dashboardTagsButton'}>#jeffsum</Button>
            </Tooltip>
            {
              // @ts-ignore
              <Text fontSize={{ base: '14px', md: '20px' }} noOfLines={{ base: '4', md: '7' }}>
                Must go <i>faster</i>... go, go, go, go, go! What do they got in there? <b>King Kong</b>? Did he just
                throw my cat out of the window? Life finds a way. Is this my espresso machine? Wh-what is-h-how did you
                get my espresso machine? Remind me to thank John for a lovely weekend.
              </Text>
            }
          </Box>
        </Flex>
      </Flex>
    </Center>
  );
}
