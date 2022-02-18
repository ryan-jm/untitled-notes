import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '../contexts/AuthContext';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
