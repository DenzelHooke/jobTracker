import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import authService from '@/features/auth/authService';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    if (loggedIn) {
      return;
    }

    if (user) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

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
            {loggedIn ? (
              <>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li className="logout-btn">
                  <Link href="/login" onClick={() => onLogout()}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/register">Register</Link>
                </li>
                <li className="">
                  <Link href="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
