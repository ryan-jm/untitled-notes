import '../styles/globals.css';
import { ChakraProvider, theme } from '@chakra-ui/react';
import AuthProvider from '../contexts/AuthContext';
import Header from '../components/Header';

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
