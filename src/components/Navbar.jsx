// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-scroll';
import '../style.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* ✅ Logo scrolls to top (home) */}
        <Link
          to="home"
          smooth={true}
          duration={500}
          onClick={closeMenu}
          className="logo"
        >
          HashHype<span>Labs</span>
        </Link>

        {/* Menu Icon */}
        <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><Link to="about" smooth={true} duration={500} onClick={closeMenu}>About us</Link></li>
          <li><Link to="TrackRecord" smooth={true} duration={500} onClick={closeMenu}>Track records</Link></li>
          <li><Link to="Team" smooth={true} duration={500} onClick={closeMenu}>Team</Link></li>
          <li><Link to="Benefits" smooth={true} duration={500} onClick={closeMenu}>Benefits</Link></li>
          <li><Link to="ClientReview" smooth={true} duration={500} onClick={closeMenu}>Our Client Reviews</Link></li>
        </ul>

        {/* Talk Button */}
        <Link
          to="contact"
          smooth={true}
          duration={500}
          onClick={closeMenu}
          className="talk-btn"
        >
          Let's Talk
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;