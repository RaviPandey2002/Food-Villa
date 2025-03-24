import axios from "axios";
import { useEffect, useState } from "react";
import './HeroSection.css';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Shimmer from "../Common/Shimmer";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const ingredient = [];

  useEffect(() => {
    const url = process.env.REACT_APP_FETCH_RANDOM_FOOD_ITEMS;
    const fetchMeals = async () => {
      try {
        let idSet = new Set();
        const fetchedMeals = [];

        const responses = await Promise.all([
          axios(url),
          axios(url),
          axios(url),
          axios(url),
        ]);

        responses.forEach((response) => {
          const meal = response?.data?.meals?.[0];
          if (meal && !idSet.has(meal.idMeal)) {
            fetchedMeals.push(meal);
            idSet.add(meal.idMeal);
          }
        });

        setMeals(fetchedMeals);
        setLoading(false);
      } catch (error) {
        console.error(`Error occurred while fetching hero meal!`, error);
        setLoading(false); // Make sure to set loading to false even if there's an error
      }
    };

    fetchMeals();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const extractIngredients = (meal) => {
    const ingredients = [];

    // Collect up to 3 non-empty, unique ingredients
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]?.trim();
      if (ingredient && !ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
        if (ingredients.length >= 3) break;
      }
    }

    // Fallback if no ingredients found
    return ingredients.length > 0 ? ingredients : ['Chicken', 'Beef', 'Rice'];
  };

  const handleExploreClick = (meal) => {
    const ingredients = extractIngredients(meal);
    // Encode ingredients for URL
    const params = new URLSearchParams();
    ingredients.forEach(ing => params.append('ingredients', ing));
    console.log('params',params)
    navigate(`/explore-meals?${params.toString()}`);
  };

  return (
    <section className="hero-section">
      {(loading) ? (
        <Shimmer type="hero-section" />
      ) : (
        <div className="container">
          <Slider {...settings}>
            {meals.map((meal) => (
              <div key={meal.idMeal} className="hero-content">
                <img
                  className="hero-image"
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  onLoad={() => { }} // This helps with some edge cases in React
                  onError={() => { }} // Handle potential image errors
                />
                <div className="hero-text">
                  <h1>Try Our Special: {meal.strMeal}</h1>
                  <p>{meal.strInstructions?.substring(0, 150)}...</p>
                  <button onClick={() => { handleExploreClick(meal) }} className="hero-button">
                    Explore More Meals
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
};

export default HeroSection;