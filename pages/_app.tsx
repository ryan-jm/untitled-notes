import '../styles/globals.css';

import AuthProvider from '../contexts/AuthContext';
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
