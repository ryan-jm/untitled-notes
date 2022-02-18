import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '../contexts/AuthContext';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
