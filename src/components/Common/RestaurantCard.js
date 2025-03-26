import React from "react";
import "./Common.css"
import Shimmer from "./Shimmer";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ food, loading }) => {

  const navigate = useNavigate()

  if (loading) {
    return <Shimmer type="card" />; // Show shimmer effect while loading
  }

  return (
    <div className="food-card">
      <img src={food.strMealThumb} alt={food.strMeal} className="food-image" />
      <div className="food-details">
        <h3>{food.strMeal}</h3>
        <p>{food.strInstructions.substring(0, 100)}...</p>
        <button onClick={() => navigate(`/meal/${food.idMeal}`)} className="food-button">View Details</button>
      </div>
    </div >
  );
};

export default RestaurantCard;