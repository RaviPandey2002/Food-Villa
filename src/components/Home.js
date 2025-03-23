import React from 'react'
import SearchBar from './SearchBar.js'
import Content from './Content.js'
import HeroSection from './HeroSection/HeroSection.js'

const Home = () => {
    return (
        <div className="body">
            <HeroSection />
            <Content />
        </div>
    )
}

export default Home;