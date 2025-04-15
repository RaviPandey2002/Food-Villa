import React, { useEffect, useState } from "react";
import "./Common.css"
import Shimmer from "./Shimmer";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ food, loading }) => {
  const navigate = useNavigate();
  const [truncateLength, setTruncateLength] = useState(100);


  // For showing the number of words in hero-text
  useEffect(() => {
    const updateLength = () => {
      const width = window.innerWidth;
      if (width < 480) setTruncateLength(40);
      else if (width < 768) setTruncateLength(60);
      else setTruncateLength(70);
    };

    updateLength(); // Initial run
    window.addEventListener('resize', updateLength);
    return () => window.removeEventListener('resize', updateLength);
  })


  if (loading) {
    return <Shimmer type="card" />; // Show shimmer effect while loading
  }

  return (
    <>
      <img src={food.strMealThumb} alt={food.strMeal} loading="lazy" className="food-image" />
      <div className="food-details">
        <h3>
          {(food.strMeal.length > 20)
            ? `${food.strMeal.slice(0, 20)}...`
            : food.strMeal}
        </h3>        <p>{food.strInstructions?.substring(0, truncateLength)}...</p>
        <button onClick={() => navigate(`/meal/${food.idMeal}`)} className="food-button">View Details</button>
      </div>
    </ >
  );
};

export default RestaurantCard;