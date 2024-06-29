import React from 'react'

const RestaurantCard = ( { imgId, name, avgRating } ) => {
  return (
    <div className="card">
              <img
                className="foodImage"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${imgId}`}
                alt="img here"
              />
              <h3>{name} </h3>
              <h4>{avgRating}</h4>
            </div>
  )
}

export default RestaurantCard