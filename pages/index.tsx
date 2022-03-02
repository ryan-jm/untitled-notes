import { Flex, Box, Center, Heading, Button, Text, Tooltip, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export default function Home() {
  const MotionBox = motion(Box);

  const untitled = 'Untitled';
  const jeffy = `Must go faster... go, go, go, go, go! What do they got in there? King Kong? Did he just
                throw my cat out of the window? Life finds a way. Is this my espresso machine? Wh-what is-h-how did you
                get my espresso machine? Remind me to thank John for a lovely weekend.`;

  const title = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const text = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

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
          <MotionBox animate={{ opacity: [0, 1.1, 1] }} transition={{ duration: 5 }}>
            <Heading fontSize={{ base: '24px', md: '40px', lg: '56px' }}>
              Make capturing your thoughts <span className="gradient">easy</span>
            </Heading>
          </MotionBox>
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
            <MotionBox className="load-screen--message" variants={title} initial="hidden" animate="visible">
              <Heading fontSize={{ base: '24px', md: '40px' }}>
                {untitled.split('').map((char, index) => {
                  return (
                    <motion.span key={char + '-' + index} variants={text}>
                      {char}
                    </motion.span>
                  );
                })}
              </Heading>

              <MotionBox animate={{ scale: [0, 1.1, 1] }} transition={{ duration: 1.5 }}>
                <Tooltip label="God help us, we're in the hands of engineers. - Jeffsum.com" aria-label="A tooltip">
                  <Button variant={'dashboardTagsButton'}>#jeffsum</Button>
                </Tooltip>
              </MotionBox>
              {
                // @ts-ignore
                <Text fontSize={{ base: '14px', md: '20px' }} noOfLines={{ base: '4', md: '7' }}>
                  {jeffy.split('').map((char, index) => {
                    return (
                      <motion.span key={char + '-' + index} variants={text}>
                        {char}
                      </motion.span>
                    );
                  })}
                </Text>
              }
            </MotionBox>
          </Box>
        </Flex>
      </Flex>
    </Center>
  );
}
