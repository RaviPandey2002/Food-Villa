import React from 'react'
import SearchBar from './SearchBar.js'
import Content from './Content.js'
import HeroSection from './HeroSection/HeroSection.js'
import CategoryExplorer from './CategoryExplorer/CategoryExplorer.js'

const Home = () => {
    return (
        <div className="body">
            <HeroSection />
            <CategoryExplorer />
            <Content />
        </div>
    )
}

export default Home;