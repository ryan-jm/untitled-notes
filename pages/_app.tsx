import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';

import Header from '../components/Header';
import AuthProvider from '../contexts/AuthContext';
import NoteProvider from '../contexts/NoteContext';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <NoteProvider>
          <Header />
          <Component {...pageProps} />
        </NoteProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
