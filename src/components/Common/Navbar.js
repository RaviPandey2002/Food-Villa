import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState("SignUp");

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src="/public/assets/logo.png" alt="Food Villa Logo" />
      </Link>
      <ul className="navLinks">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/favourites">Favourite List</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
