import React, { useState } from "react";
import logo from "../../public/Image/Food-Villa.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState("SignUp");

  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="Food Villa" />
      <ul className="navLinks">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/Cart">My Orders</Link>
        {!isLoggedIn && (
            <Link to="/signUp"> 
            <button 
              onClick={(e)=>{  e.target.value="LoggedIn"; setStatus("LogIn")}}
            > { status }</button>
            </Link>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
