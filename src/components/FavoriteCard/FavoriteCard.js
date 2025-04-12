import { useEffect, useState } from "react";
import "./FavoriteCard.css"
import { useNavigate } from "react-router-dom";

const FavoriteCard = ({ cardMeal, favorites, setFavorites }) => {
  const [meal, setMeal] = useState();
  const navigate = useNavigate();

  const removeFavorite = (mealId) => {
    const updatedFavorites = favorites.filter(fav => fav.idMeal !== mealId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorite-card">
      <img
        src={cardMeal?.strMealThumb}
        alt={cardMeal?.strMeal}
        onClick={() => navigate(`/meal/${cardMeal?.idMeal}`)}
      />
      <div className="favorite-info">
        <h3>{cardMeal?.strMeal}</h3>
        <div className="favorite-actions">
          <button
            className="view-button"
            onClick={() => navigate(`/meal/${cardMeal?.idMeal}`)}
          >
            View Recipe
          </button>
          <button
            className="remove-button"
            onClick={() => removeFavorite(cardMeal?.idMeal)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default FavoriteCard;