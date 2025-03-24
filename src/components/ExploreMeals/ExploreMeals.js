import { useLocation } from "react-router-dom";
import "./ExploreMeals.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Shimmer from "../Common/Shimmer";

const ExploreMeals = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ingredients = queryParams.getAll('ingredients');
  const ingredient = ingredients[0]
  console.log("ingredients", ingredients)
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const allMeals = [];


  useEffect(() => {
    const fetchMeals = async () => {
      try {

        for (const ing of ingredients) {
          const url = `${process.env.REACT_APP_SEARCH_MEAL_BY_INGREDIENT}${ingredient}`
          console.log("url", url)
          const data = (await axios(url))?.data?.meals;
          allMeals.push(...data);

          if (allMeals.length > 16) {
            break;
          }
        }

        console.log("meals", meals);
        setMeals(allMeals.slice(0, 15) || [])

        setIsLoading(false)
      } catch (error) {
        setError(`No meals found with "${ingredient}". Try another ingredient!`);
        console.error(`Error while fetching meals in Explore meals section. error: ${error}`)
      }
    }
    if (ingredient) {
      fetchMeals()
    }

  }, [])


  return (
    <div className="explore-meals">
      <h2>Meals with {ingredient}</h2>
      {isLoading ? (
        <Shimmer type="card" />
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => window.history.back()}>Go Back</button>
          {/* Or suggest popular ingredients */}
        </div>
      ) : (
        <div className="meals-grid">
          {
            meals.map((meal) => (
              <div key={meal.idMeal} className="meal-card">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h3>{meal.strMeal}</h3>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default ExploreMeals