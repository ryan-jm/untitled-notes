import { ChakraProvider, Flex } from '@chakra-ui/react';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import theme from '../styles/theme';
import '../styles/all.css';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthProvider from '../contexts/AuthContext';
import NoteProvider from '../contexts/NoteContext';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <NoteProvider>
          {!loading ? (
            <Flex direction={'column'} minHeight={'100vh'} position={'relative'}>
              <Flex direction={'column'} minHeight={'100%'} pb="80px">
                <Header />
                <Component {...pageProps} />
              </Flex>
              <Footer />
            </Flex>
          ) : (
            <Loading />
          )}
        </NoteProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
