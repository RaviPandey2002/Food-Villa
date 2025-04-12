import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Favorites.css';
import FavoriteCard from '../FavoriteCard/FavoriteCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(" favorites favorites", favorites);
    setFavorites(storedFavorites);
  }, []);


  return (
    <div className="favorites-page outlet-container">
      <h1>Your Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>No favorites yet! Save recipes using the ❤️ icon.</p>
          <button onClick={() => navigate('/')}>Browse Recipes</button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(meal => (
            <FavoriteCard
              key={meal.idMeal}
              cardMeal={meal}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;