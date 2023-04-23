import React from 'react';
import { useRouter } from 'next/router';

const Header = () => {
  const imageURL = '/assets/busy-downtown.jpg';
  const router = useRouter();

  const onGetStarted = () => {
    router.push('register');
  };

  return (
    <header className="index-header">
      <div className="max-container">
        <div className="content">
          <h1 className="title">
            Keep track of your job applications with <span>ease</span>
          </h1>
          <p>
            Gone are the days of losing track of your job applications. Keep
            track of all applications in one place, set reminders, and gain
            valuable insights.
          </p>
          <button className="clickable roundBtn" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
