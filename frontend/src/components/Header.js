import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        {/* logo */}
        <img src="/logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Contact Me</a></li>
        </ul>
      </nav>
      <button className="signout-btn">Sign Out</button>
    </header>
  );
};

export default Header;
