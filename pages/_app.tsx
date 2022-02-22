import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';

import Header from '../components/Header';
import AuthProvider from '../contexts/AuthContext';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
