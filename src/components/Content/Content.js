import React, { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from '../Common/RestaurantCard.js'
import Shimmer from "../Common/Shimmer";
import { shuffleArray } from "../../utils/common";
import "./Content.css";

const Content = () => {
  const [listItems, setListItems] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [animatedCircle, setAnimatedCircle] = useState(null); // 🔁 new state

  const alphabetGroups = [
    "ABCDEFGHI".split(""),
    "JKLMNOPR".split(""),
    "STUVWXYZ".split(""),
  ];

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      let mappedData = [];

      if (search.trim().length < 1) {
        let url = `${process.env.REACT_APP_FETCH_MULTIPLE_FOOD_ITEMS}`;
        let fetchedData = await axios(url);
        fetchedData = fetchedData?.data?.meals?.splice(0, 12);
        mappedData = shuffleArray(fetchedData);
      } else {
        const firstLetter = search[0];
        const searchUrl = `${process.env.REACT_APP_SEARCH_MEAL_BY_FIRST_LETTER}${firstLetter}`;
        mappedData = (await axios.get(searchUrl))?.data?.meals;
      }

      setListItems(mappedData);
      setLoading(false);
    };

    if (!listItems) handleFetch();
    handleFetch();
  }, [search]);

  const handleClick = (letter, groupIndex) => {
    setSearch((prev) => (prev === letter ? "" : letter));
    setAnimatedCircle(groupIndex);

    // Remove the animation class after animation ends
    setTimeout(() => {
      setAnimatedCircle(null);
    }, 600); // match CSS animation duration
  };

  return (
    <>
      <div className="container">
        <h2 className="title">Choose a Letter to Filter Dishes</h2>

        <div className="multiple-circles-wrapper">
          {alphabetGroups.map((group, groupIdx) => (
            <div
              className={`alphabet-circle ${
                animatedCircle === groupIdx ? "rotate" : ""
              }`}
              key={groupIdx}
            >
              {group.map((letter, index) => {
                const angle = (360 / group.length) * index;
                return (
                  <button
                    key={letter}
                    onClick={() => handleClick(letter, groupIdx)}
                    className={`circle-letter ${search === letter ? "selected" : ""}`}
                    style={{
                      transform: `rotate(${angle}deg) translate(3em) rotate(-${angle}deg)`,
                    }}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="content">
        {loading ? (
          <Shimmer type="card" />
        ) : (
          listItems?.map((food) => (
            <div className="food-card" key={food.idMeal}>
              <RestaurantCard food={food} loading={loading} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Content;
