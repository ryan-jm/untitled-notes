import '../styles/globals.css';

import AuthProvider from '../contexts/AuthContext';
import { ChakraProvider } from '@chakra-ui/react'
import Header from '../components/Header';
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
      <Header />
      <Nav />
      <Component {...pageProps} />
    </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
