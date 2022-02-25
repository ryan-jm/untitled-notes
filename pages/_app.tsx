import { ChakraProvider, Flex } from '@chakra-ui/react';

import theme from '../styles/theme';

import '../styles/all.css';

import '../styles/globals.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

import AuthProvider from '../contexts/AuthContext';
import NoteProvider from '../contexts/NoteContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <NoteProvider>
          <Flex direction={'column'} minHeight={'100vh'} position={'relative'}>
            <Flex direction={'column'} minHeight={'100%'} pb="80px">
              <Header />
              <Component {...pageProps} />
            </Flex>
            <Footer />
          </Flex>
        </NoteProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
