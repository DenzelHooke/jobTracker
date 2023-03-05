import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <>
      <nav id="navbar">
        <div className="flex">
          <div className="logo">
            <Image
              className="logo-image"
              alt="Website logo"
              src="/assets/job-tracker-logo-white.png"
              width="200"
              height="80"
            />
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="logout-btn">
              <Link href="/">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
