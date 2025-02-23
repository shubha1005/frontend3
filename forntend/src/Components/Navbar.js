import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = ({ user, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
      <img 
  src="/images/logo.png" 
  alt="Profile" 
  style={{ 
    width: "50px", 
    height: "50px", 
    borderRadius: "50%", 
    objectFit: "cover",
    marginRight: "10px" ,
    border: "3px solid #40916c" // Optional border
  }} 
/>


         Eco Circuit
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <i className={`bi ${menuOpen ? "bi-x" : "bi-list"}`}></i>
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}><i className="bi bi-house-door"></i> Dashboard</Link></li>
        <li><Link to="/education" onClick={() => setMenuOpen(false)}><i class="bi bi-book-half"></i> Education</Link></li>
        <li><Link to="/Eselection" onClick={() => setMenuOpen(false)}><i className="bi bi-lightbulb"></i> E Selection </Link></li>

        {user ? (
          <li>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </li>
        ) : (
          <li><Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
