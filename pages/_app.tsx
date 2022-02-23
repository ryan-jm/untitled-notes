import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';

import Header from '../components/Header';

import AuthProvider from '../contexts/AuthContext';

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
