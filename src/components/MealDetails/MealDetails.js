import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MealDetails.css';
import Shimmer from '../Common/Shimmer';

const MealDetails = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(true);
    const [ingredients, setIngredients] = useState([])
    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_SEARCH_FIND_FOOD_DETAIL}${id}`
                );
                setMeal(response?.data?.meals[0]);
            } catch (error) {
                console.error('Error fetching meal details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMealDetails();
    }, [id]);

    // Check if meal is favorite on load
    useEffect(() => {
        if (meal) {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setIsFavorite(favorites.some(fav => fav?.idMeal === meal?.idMeal));

            let tempIngredients = []

            // Extract ingredients and measurements
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    tempIngredients.push({
                        name: meal[`strIngredient${i}`],
                        measure: meal[`strMeasure${i}`]
                    });
                }
            }

            setIngredients(tempIngredients);
        }

    }, [meal]);

    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem('favorites')) || [];
        } catch (error) {
            console.error("Error reading favorites:", error);
            return [];
        }
    }

    // <div className="food-card">
    //   <img src={food.strMealThumb} alt={food.strMeal} loading="lazy" className="food-image" />
    //   <div className="food-details">
    //     <h3>{food.strMeal}</h3>
    //     <p>{food.strInstructions.substring(0, 100)}...</p>
    //     <button onClick={() => navigate(`/meal/${food.idMeal}`)} className="food-button">View Details</button>
    //   </div>
    // </div >


    const toggleFavorite = () => {

        // Create a simplified meal object without circular references
        const simplifiedMeal = {
            idMeal: meal?.idMeal,
            strMeal: meal?.strMeal,
            strMealThumb: meal?.strMealThumb,
            strInstructions: meal?.strInstructions
        };

        const favorites = getFavorites();
        if (isFavorite === true) {
            const updatedFavoritesList = favorites.filter(fav => fav?.idMeal != meal?.idMeal);
            localStorage.setItem('favorites', JSON.stringify(updatedFavoritesList));
        }
        else {
            localStorage.setItem('favorites', JSON.stringify([...favorites, simplifiedMeal]))
        }
        setIsFavorite(!isFavorite);
        alert(isFavorite ? 'Removed from favorites!' : 'Recipe saved!');
    }

    window.addEventListener('storage', (event) => {
        if (event.key === 'favorites') {
            updateUI(); // Refresh favorites display
        }
    });

    return (

        <div className="outlet-container">
            {
                loading
                    ? <Shimmer type="meal-details" />
                    : <div className="meal-details ">
                        <div className="meal-header">
                            <h1>{meal?.strMeal}</h1>
                            <img
                                src={meal?.strMealThumb}
                                alt={meal?.strMeal}
                                className="meal-image"
                                loading="lazy"
                            />
                        </div>

                        <div className="meal-content">
                            <div className="ingredients-section">
                                <div className="ingredients-header">
                                    <h2>Ingredients</h2>
                                    <button
                                        onClick={toggleFavorite}
                                        className="favorite-button"
                                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        {isFavorite ? (
                                            <>
                                                <span className="heart-icon">❤️</span>
                                                <span className="button-text">Saved</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="heart-icon">🤍</span>
                                                <span className="button-text">Save Recipe</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                                <ul>
                                    {ingredients.map((item, index) => (
                                        <li key={index}>
                                            {item.measure} {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="instructions-section">
                                <h2>Instructions</h2>
                                <p>{meal?.strInstructions}</p>
                                {meal?.strYoutube && (
                                    <div className="video-section">
                                        <h2>Video Tutorial</h2>
                                        <iframe
                                            width="100%"
                                            height="400"
                                            src={`https://www.youtube.com/embed/${meal?.strYoutube.split('v=')[1]}`}
                                            title={meal.strMeal}
                                            frameBorder="0"
                                            allowFullScreen
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default MealDetails;