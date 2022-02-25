import { Box, Link, Container, Stack, Text, useColorModeValue, IconButton } from '@chakra-ui/react';

import GitHubLogo from './svgs/github';

export default function Footer() {
  return (
    <Box
      position={'absolute'}
      bottom={'0'}
      width={'100%'}
      h="80px"
      bg={'transparent'}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text fontSize={'sm'}>© 2022 SevenEleventh. All rights reserved. Published under MIT license.</Text>
        <Stack direction={'row'} spacing={6}>
          <Link href={'https://github.com/ryan-jm/untitled-notes'} isExternal>
            <IconButton variant={'primary'} aria-label="Search database" icon={<GitHubLogo />} />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
