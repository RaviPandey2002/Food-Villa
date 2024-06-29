import React from 'react'
import Navbar from './components/Navbar';
import Body from './components/Body';
import Footer from './components/Footer';
import '../public/index.css'


/**
 *Header -> logo, navComponents, drawer
 * 
 * body -> normal card-show case with 
 * 
 * footer -> small things
 *
 * 
 * 
 */


const App = () => {
  return (
    <>
      <Navbar />
      <Body />
      <Footer />
    
    </>
  )
}

export default App