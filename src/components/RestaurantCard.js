import React from "react";

const RestaurantCard = ({ idMeal, strMeal, strArea, strMealThumb }) => {

  // let cuisinesList = cuisines[0];
  // for (let i = 1; i < cuisines.length; i++) {
  //   if (cuisinesList.length + cuisines[i].length > 20)
  //     {
  //       break;
  //     }

  //   cuisinesList +=  "," + cuisines[i];
  // }
  // cuisinesList += "...";

  return (
    <div className="card">
      <div className="imgDiv">
        <img
          className="foodImage"
          src={strMealThumb}
          alt="Food image here"
        />
      </div>
      <h5>{strMeal} - { strArea }</h5>
      {/* <h4> * {strArea}</h4> */}
      {/* <h4> {cuisinesList}</h4> */}
    </div>
  );
};

export default RestaurantCard;
