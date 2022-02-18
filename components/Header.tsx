import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  function goToAuth() {
    if (!user?.accessToken) router.push('/auth');
    else logout();
  }
  //    console.log(Object.keys(user?));
  console.log(user, 'userrrrrr');

  return (
    <>
      <h1>Headerrrrrr</h1>
      <button onClick={goToAuth}>{!user?.accessToken ? 'Login' : 'Logout'}</button>
      <p>
        {user?.accessToken ? 'User:' : ''} {user?.displayName}
      </p>
      <img src={user?.photoURL} />
      <br /> <br />
    </>
  );
};

export default Header;
