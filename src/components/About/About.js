import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="food-hero">
        <div className="hero-content">
          <h1>Savor the Code, Taste the Innovation</h1>
          <p>Where raw JavaScript meets culinary inspiration</p>
        </div>
      </section>

      <section className="story-section">
        <div className="story-container">
          <div className="story-text">
            <h2>From Scratch Cooking</h2>
            <p>
              This project demonstrates how fundamental web technologies can create rich experiences:
            </p>
            <ul className="culinary-metaphors">
              <li>🧂 <strong>Vanilla Foundation</strong> - Built with core HTML, CSS, and JavaScript</li>
              <li>🔪 <strong>Sharp Performance</strong> - Optimized without heavyweight libraries</li>
              <li>🥘 <strong>API Simmering</strong> - Multiple endpoints expertly blended together</li>
            </ul>
          </div>
          <div className="story-image">
            <img
              src="/public/Images/about-story.jpeg"
              alt="Cooking ingredients"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="tech-showcase">
        <h2>API Handling Showcase</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <h3>Core APIs Utilized</h3>
            <div className="code-snippet">
              <pre>
                {`// TheMealDB - Primary recipe data
fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')

// Custom proxy server - Handling CORS
fetch('/api/proxy?url=' + encodeURIComponent(apiUrl))

// Browser APIs - No external dependencies
localStorage.setItem('favorites', JSON.stringify(data))`}
              </pre>
            </div>
            <p>Implemented proper error handling, loading states, and data transformation for each</p>
          </div>

          <div className="tech-card">
            <h3>Pure JavaScript Solutions</h3>
            <ul className="tech-stack">
              <li>🔍 <strong>Custom Search</strong> - Client-side filtering without external libraries</li>
              <li>🔄 <strong>State Management</strong> - Using vanilla JS patterns</li>
              <li>📱 <strong>Responsive Design</strong> - Media queries and flexible layouts</li>
              <li>⚡ <strong>Performance</strong> - Lazy loading, efficient renders</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="developer-note">
        <blockquote>
          "This project serves as a demonstration that beautiful, functional web applications can be built
          without relying on frameworks - just like great food needs only quality ingredients and proper technique."
          <footer>- Ravi, demonstrating core web competency</footer>
        </blockquote>
      </section>

      <section className="principles-section">
        <h2>Core Development Principles</h2>
        <div className="principles-grid">
          <div className="principle-card">
            <h3>Modular Architecture</h3>
            <p>Components organized like a well-stocked pantry - everything in its place</p>
          </div>
          <div className="principle-card">
            <h3>Progressive Enhancement</h3>
            <p>Core functionality works everywhere, enhanced where supported</p>
          </div>
          <div className="principle-card">
            <h3>Defensive Coding</h3>
            <p>Graceful degradation when APIs fail or features aren't supported</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;