import React, { useEffect, useState } from "react";
import RestaurantCard from "./Common/RestaurantCard";
import { Link } from 'react-router-dom'
import axios from "axios";
import FoodShimmer from "./Common/Shimmer";
import Shimmer from "./Common/Shimmer";

const Content = () => {
  const [listItems, setListItems] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true)

  // To shuffle the constant data from the API
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      // URL for getting random food items data from The Meal DB API.
      // const fetchRandomMealURL = `${process.env.REACT_APP_FETCH_RANDOM_FOOD_ITEMS}`

      // const searchUrl = `${process.env.REACT_APP_SEARCH_MEAL_BY_FIRST_LETTER}${firstLetter}`;
      let mappedData = []
      if (search.trim().length < 1) {

        let url = `${process.env.REACT_APP_FETCH_MULTIPLE_FOOD_ITEMS}`

        let fetchedData = await axios(url)
        fetchedData = fetchedData?.data?.meals
        fetchedData = fetchedData.splice(0, 12)

        mappedData = shuffleArray(fetchedData)

        // used to get random food item on each api request and then collect!!
        /*
  
        const fetchRandomMealURL = `${process.env.REACT_APP_FETCH_RANDOM_FOOD_ITEMS}`;
        console.log("fetchRandomMealURL", fetchRandomMealURL)
  
        const mealPromises = []
        for (let i = 1; i <= 15; i++) {
          mealPromises.push(axios.get(fetchRandomMealURL))
        }
  
        const uniqueIds = new Set();
        const responses = await Promise.all(mealPromises);
  
        mappedData = responses.reduce((acc, response) => {
          const meal = response?.data?.meals?.[0];
          if (meal && !uniqueIds.has(meal.idMeal)) {
            uniqueIds.add(meal.idMeal);
            acc.push(meal);
          }
          return acc;
        }, []);
  
        */

      } else {
        const firstLetter = search[0];

        const searchUrl = `${process.env.REACT_APP_SEARCH_MEAL_BY_FIRST_LETTER}${firstLetter}`
        mappedData = (await axios.get(searchUrl))?.data?.meals;

      }

      setListItems(mappedData)
      setLoading(false);

    };

    if (!listItems) handleFetch();
    handleFetch()

  }, [search]);

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const handleClick = (letter) => {
    console.log("letter", letter)
    if (letter == search) {
      setSearch("")
    }
    else {
      setSearch(letter)
    }
  };

  return (
    <>
      {/* <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <button
          onSubmit={(e) => {
            e.preventDefault;
          }}
        >
          here
        </button>

      </div> */}
      <div>
        <div className="container">
          <h2 className="title"> Filter Dishes Based on first Alphabet of the food name!!</h2>
          <div className="alphabet-container">
            {alphabets.map((letter) => (
              <button
                key={letter}
                onClick={() => handleClick(letter)}
                className={`alphabet-button ${search === letter ? "selected" : ""}`}
              >
                {letter}
              </button>
            ))}
          </div>

        </div>
      </div>
      <div className="content">
        {
          loading ? (<Shimmer type="card" />) :
            (listItems.map((food) => {

              return (
                <div key={food.idMeal} > <RestaurantCard food={food} loading={loading} /></div>
              );
            }))
        }
      </div>
    </>
  );
};

export default Content;
