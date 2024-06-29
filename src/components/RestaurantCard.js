import React from "react";

const RestaurantCard = ({ imgId, name, avgRating, sla, cuisines }) => {
  let cuisinesList = cuisines[0];
  for (let i = 1; i < cuisines.length; i++) {
    if (cuisinesList.length + cuisines[i].length > 20)
      {
        break;
      }

    cuisinesList +=  "," + cuisines[i];
  }
  cuisinesList += "...";

  return (
    <div className="card">
      <div className="imgDiv">
      <img
        className="foodImage"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${imgId}`}
        alt="img here"
      />
      </div>
      <h3>{name} </h3>
      <h4> * { avgRating } .{ sla.slaString } </h4>
      <h4> {cuisinesList}</h4>
    </div>
  );
};

export default RestaurantCard;
