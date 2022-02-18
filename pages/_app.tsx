import '../styles/globals.css';

import AuthProvider from '../contexts/AuthContext';
import Header from '../components/Header';
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Header />
      <Nav />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
