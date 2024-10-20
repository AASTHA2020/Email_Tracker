import React from 'react';
import '../styles/Header.css'; // Importing styles for header

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
      </div>
      <nav>
        <ul className="nav-list">
          <li><a href="#" className="nav-link">Home</a></li>
          <li><a href="#" className="nav-link">Contact Me</a></li>
        </ul>
      </nav>
      <button className="signout-btn">Sign Out</button>
    </header>
  );
};

export default Header;
