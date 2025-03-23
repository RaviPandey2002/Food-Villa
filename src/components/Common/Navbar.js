import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState("SignUp");

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src="/assets/logo.png" alt="Food Villa" />
      </Link>
      <ul className="navLinks">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/Cart">My Orders</Link>
        {!isLoggedIn && (
          <Link to="/signUp">
            <button
              onClick={(e) => { e.target.value = "LoggedIn"; setStatus("LogIn") }}
            > {status}</button>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
