import axios from "axios"
import { useEffect, useState } from "react"
import './HeroSection.css';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Shimmer from "../Common/Shimmer";


const HeroSection = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const url = process.env.REACT_APP_FETCH_RANDOM_FOOD_ITEMS
    const fetchMeals = async () => {
      try {
        let cnt = 1;
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
          }

          idSet.add(meal.idMeal);
        })

        setMeals(fetchedMeals);
        setLoading(false);

      } catch (error) {
        console.error(`Error occurred while fetching hero meal!`, error);
      }
    };

    fetchMeals();
  }, [])


  // Track when all images have loaded
  useEffect(() => {
    if (!loading && meals.length > 0) {
      const images = document.querySelectorAll(".hero-image");
      let loadedCount = 0;

      const handleImageLoad = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setImagesLoaded(true); // All images have loaded
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          handleImageLoad(); // Image is already loaded
        } else {
          img.addEventListener("load", handleImageLoad); // Wait for image to load
        }
      });

      // Cleanup event listeners
      return () => {
        images.forEach((img) => {
          img.removeEventListener("load", handleImageLoad);
        });
      };
    }
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

  const handleExploreClick = () => {

  }

  return (
    <section className="hero-section">
      {/* {console.log("meals", meals)} */}
      {
        (loading || imagesLoaded) ? (<Shimmer type="hero-section" />)
          : (<div className="container">
            <Slider {...settings}>
              {meals.map((meal) => (
                <div key={meal.idMeal} className="hero-content">
                  <img
                    className="hero-image"
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                  />
                  <div className="hero-text">
                    <h1>Try Our Special: {meal.strMeal}</h1>
                    <p>{meal.strInstructions.substring(0, 150)}...</p>
                    <button onClick={handleExploreClick} className="hero-button">Explore More Meals</button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>)
      }

    </section>
  )
}

export default HeroSection