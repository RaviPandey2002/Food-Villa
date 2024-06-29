import React from 'react'
import logo from '../../public/Image/Food-Villa.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="Food Villa" />
      <ul className="navLinks">
          <li>Home</li>
          <Link to="/about">About Us</Link>
          <li>My_Orders</li>
          <button> Sign In</button>
      </ul>
    </div>
  )
}

export default Navbar