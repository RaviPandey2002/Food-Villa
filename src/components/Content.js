import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from 'react-router-dom'
import axios from "axios";

const Content = () => {
  const [listItems, setListItems] = useState(null);
  const [search, setSearch] = useState("");
  const [dummyData, setDummyData] = useState(null);

  useEffect(() => {
    if (!listItems) handleFetch();
    if (dummyData === null) setDummyData(listItems);
    if (search != "") {
      handleFetch()
    } else setDummyData(listItems);
  }, [search, listItems]);

  const handleFetch = async () => {

    // URL for getting random food items data from The Meal DB API.
    // const fetchRandomMealURL = `${process.env.REACT_APP_FETCH_RANDOM_FOOD_ITEMS}`

    // const searchUrl = `${process.env.REACT_APP_SEARCH_MEAL_BY_FIRST_LETTER}${firstLetter}`;
    let mappedData = []
    if (search.trim().length < 1) {
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
      setListItems(mappedData);

    } else {
      const firstLetter = search[0];

      const searchUrl = `${process.env.REACT_APP_SEARCH_MEAL_BY_FIRST_LETTER}${firstLetter}`
      console.log("searchUrl", searchUrl)
      mappedData = (await axios.get(searchUrl))?.data?.meals;

      setDummyData(mappedData)
    }
  };

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
      {dummyData == null && <Shimmer />}
      <div className="content">
        {dummyData != null &&
          dummyData.map((item) => {
            // const reqURL = "https://www.swiggy.com/restaurants/";
            // const foodID = (item?.cta?.link).slice(reqURL.length,item?.cta?.link.length); 

            return (
              // <Link to={item.cta.link} key={item.info.id} link={item}> <RestaurantCard
              //   {...item.info}
              // /> </Link>

              <Link key={item.idMeal} > <RestaurantCard {...item} /></Link>
            );
          })}
      </div>
    </>
  );
};

export default Content;
