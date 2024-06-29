import React from 'react'
import logo from '../../public/Image/Food-Villa.png'

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="Food Villa" />
      <ul className="navLinks">
          <li>Home</li>
          <li>About Us</li>
          <li>My_Orders</li>
      </ul>
    </div>
  )
}

export default Navbar