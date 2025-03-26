import { useLocation, useNavigate } from "react-router-dom";
import "./ExploreMeals.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Shimmer from "../Common/Shimmer";

const ExploreMeals = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryIngredients = queryParams.getAll('ingredients');
  const queryCategory = queryParams.get('category');

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomCategories, setRandomCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false)
  const mealIds = new Set();
  const navigate = useNavigate();


  const ingredientsList = (queryIngredients.slice('')).join(" , ")

  // For fetching the Explore meals
  useEffect(() => {
    let mealsArray = []
    const fetchMeals = async () => {
      try {
        if (queryCategory) {
          const categoryUrl = `${process.env.REACT_APP_SEARCH_MEAL_BY_CATEGORY}${queryCategory}`
          const response = await axios(categoryUrl);
          const mealsByCategory = response?.data?.meals;

          mealsArray = [...mealsByCategory]
        }
        else {
          outerLoop: for (const ingredient of queryIngredients) {
            const url = `${process.env.REACT_APP_SEARCH_MEAL_BY_INGREDIENT}${ingredient}`
            const data = (await axios(url))?.data?.meals;

            for (let i = 0; i < data.length; i++) {
              if (!mealIds.has(data[i]?.idMeal)) {
                mealsArray.push(data[i]);
                mealIds.add(data[i]?.idMeal);
              }
              if (mealsArray.length >= 15) {
                break outerLoop; // using single break for both loops.
              }
            }
          }
        }

        mealsArray = mealsArray.slice(0, 15);

        setMeals(mealsArray || [])
        setIsLoading(false)
      } catch (error) {
        const queryCategory = queryParams.get('category');
        setError(` Sorry!! No meals found with - "${ingredientsList || queryCategory}". Try another ingredient!`);
        console.error(`Error while fetching meals in Explore meals section. error: ${error}`)
      }
    }
    if (queryIngredients) {
      fetchMeals()
    }

  }, [location.search])

  // For fetching random categories
  useEffect(() => {
    setLoadingCategories(true);
    let randomCategories = [];
    let randomCategoriesIds = new Set();

    const fetchCategories = async () => {
      try {
        const fetchCategoriesUrl = `${process.env.REACT_APP_SEARCH_ALL_CATEGORIES}`;
        const response = await axios(fetchCategoriesUrl)
        const allCategories = response?.data?.categories;


        while (true) {
          if (randomCategoriesIds.size >= 4) {
            break;
          }

          const randomNum = Math.floor(Math.random() * ((allCategories.length - 1) - 1) + 1);
          let selectedCategory = allCategories[randomNum];
          if (randomCategoriesIds.has(selectedCategory?.idCategory)) {
            continue;
          }
          randomCategories.push(selectedCategory);
          randomCategoriesIds.add(selectedCategory?.idCategory);

        }

        setRandomCategories(randomCategories);
        setLoadingCategories(false);

      } catch (error) {
        console.error(`Error while fetching meals by category in Explore meals section. error: ${error}`)
      }

    }

    fetchCategories();

  }, [location.search])

  return (
    <div className="explore-meals">
      <h2>Meals with - {ingredientsList || queryCategory || 'Love'}</h2>
      {isLoading ? (
        <Shimmer type="card" />
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => window.history.back()}>Go Back</button>
        </div>
      ) : (
        <>
          <div className="meals-grid">
            {
              meals.map((meal) => (
                <div onClick={() => navigate(`/meal/${meal?.idMeal}`)} key={meal?.idMeal} className="meal-card">
                  <img src={meal?.strMealThumb} alt={meal?.strMeal} />
                  <h3>{meal?.strMeal}</h3>
                </div>
              ))}
          </div>
          <div>
            {
              (meals.length > 0 && meals.length < 4 &&
                (
                  !loadingCategories ? (<div className="suggestions-panel" >
                    <h4>Try these too:</h4>
                    <div className="suggestion-tags">
                      {randomCategories.map(category => (
                        <button
                          key={category?.idCategory}
                          onClick={() => navigate(`/explore-meals?category=${category?.strCategory}`)}
                        >
                          {category?.strCategory}
                        </button>
                      ))}
                    </div>
                  </div>) : <Shimmer type="random-categories" />
                )
              )
            }

          </div>

        </>
      )
      }
    </div >
  );
}

export default ExploreMeals