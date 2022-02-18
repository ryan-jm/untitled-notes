import Link from 'next/link';

const Nav = () => {
  return (
    <>
      <Link href="/">Home Page</Link> &nbsp; &nbsp;&nbsp;&nbsp;
      <Link href="/create">New Note</Link> &nbsp; &nbsp;&nbsp;&nbsp;
      <Link href="/dashboard">DashBoard</Link>
    </>
  );
};
export default Nav;
