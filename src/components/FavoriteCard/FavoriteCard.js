import { useEffect, useState } from "react";
import "./FavoriteCard.css"

const FavoriteCard = (cardMeal) => {
  const [meal, setMeal] = useState();

  useEffect(()=>{
    setMeal(cardMeal.cardMeal);
  },[])

  const removeFavorite = (mealId) => {
    const updatedFavorites = favorites.filter(fav => fav.idMeal !== mealId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorite-card">
      <img
        src={meal?.strMealThumb}
        alt={meal?.strMeal}
        onClick={() => navigate(`/meal/${meal?.idMeal}`)}
      />
      <div className="favorite-info">
        <h3>{meal?.strMeal}</h3>
        <div className="favorite-actions">
          <button
            className="view-button"
            onClick={() => navigate(`/meal/${meal?.idMeal}`)}
          >
            View Recipe
          </button>
          <button
            className="remove-button"
            onClick={() => removeFavorite(meal?.idMeal)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default FavoriteCard;