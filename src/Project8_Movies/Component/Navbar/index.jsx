import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = ({ setSearch }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Movie Pool</Link>     
      <input 
        type="text" 
        placeholder="Search Movies..." 
        onChange={(e) => setSearch(e.target.value)}
      />
    </nav>
  );
};

export default Navbar;
