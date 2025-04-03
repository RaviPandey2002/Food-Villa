import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MealDetails.css';

const MealDetails = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (!meal) return <div className="error">Meal not found</div>;

    // Extract ingredients and measurements
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push({
                name: meal[`strIngredient${i}`],
                measure: meal[`strMeasure${i}`]
            });
        }
    }

    return (
        <div className="meal-details outlet-container">
            <div className="meal-header">
                <h1>{meal.strMeal}</h1>
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="meal-image"
                    loading="lazy"
                />
            </div>

            <div className="meal-content">
                <div className="ingredients-section">
                    <h2>Ingredients</h2>
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
                    <p>{meal.strInstructions}</p>
                    {meal.strYoutube && (
                        <div className="video-section">
                            <h2>Video Tutorial</h2>
                            <iframe
                                width="100%"
                                height="400"
                                src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`}
                                title={meal.strMeal}
                                frameBorder="0"
                                allowFullScreen
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MealDetails;