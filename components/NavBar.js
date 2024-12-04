import Link from 'next/link';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/add-user">Add User</Link></li>
      </ul>
      <style jsx>{`
        nav {
          background: lightgray;
          padding: 10px;
        }
        ul {
          list-style-type: none;
          display: flex;
          gap: 20px;
        }
        li {
          display: inline;
        }
      `}</style>
    </nav>
  );
}

export default NavBar;
