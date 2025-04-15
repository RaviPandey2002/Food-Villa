import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="food-hero">
        <div className="hero-content">
          <h1>Savor the Code, Taste the Innovation</h1>
          <p>Where culinary inspiration meets cutting-edge web development</p>
        </div>
      </section>

      <section className="story-section">
        <div className="story-container">
          <div className="story-text">
            <h2>Our Recipe for Success</h2>
            <p>
              Just like a perfect meal needs quality ingredients, our app combines:
            </p>
            <ul className="culinary-metaphors">
              <li>🍳 <strong>Fresh APIs</strong> - Harvested daily from TheMealDB</li>
              <li>🧑‍🍳 <strong>Masterful React Techniques</strong> - Carefully prepared components</li>
              <li>🔥 <strong>Performance Optimization</strong> - Slow-cooked for perfect delivery</li>
            </ul>
            <p>
              We've cooked up this digital kitchen to help food lovers discover, save,
              and share their favorite recipes with the world!
            </p>
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

      {/* Technical Showcase */}
      <section className="tech-showcase">
        <h2>Under the Hood</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <h3>API Mastery</h3>
            <div className="code-snippet">
              <pre>
                {`fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
  .then(response => response.json())
  .then(data => setMeals(data.meals));`}
              </pre>
            </div>
            <p>Dynamic data fetching with error handling and loading states</p>
          </div>

          <div className="tech-card">
            <h3>Secret Ingredients</h3>
            <ul className="tech-stack">
              <li>⚛️ React Hooks</li>
              <li>🎨 CSS Grid/Flexbox</li>
              <li>📦 Context API</li>
              <li>💾 LocalStorage Magic</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Developer Note */}
      <section className="developer-note">
        <blockquote>
          "Building this app was like preparing a complex dish -
          each component had to be perfectly timed and executed.
          The result? A delicious digital experience!"
          <footer> Ravi</footer>
        </blockquote>
      </section>
    </div>
  );
};

export default About;