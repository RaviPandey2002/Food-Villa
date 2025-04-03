import axios from "axios";
import { useEffect, useState } from "react";
import Shimmer from "../Common/Shimmer";
import { shuffleArray } from "../../utils/common";
import './CategoryExplorer.css'
import { useNavigate } from "react-router-dom";

const CategoryExplorer = () => {
	const [allCategories, setAllCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate()

	useEffect(() => {

		const fetchCategories = async () => {
			try {
				const categoryUrl = `${process.env.REACT_APP_FETCH_ALL_CATEGORIES}`
				const response = await axios(categoryUrl);
				if (response?.data) {
					let categories = response?.data?.categories;
					let shuffledCategories = shuffleArray(categories);
					shuffledCategories = shuffledCategories.splice(0, 14);
					setAllCategories(shuffledCategories)
					setLoading(false)
				}
			} catch (error) {
				console.error("Error in category-explorer page. Error: ", error);
			}
		}

		fetchCategories();

	}, [])

	const handleCategoryMealClick = (categoryName) => {
		return () => {
			navigate(`/explore-meals?category=${categoryName}`);
		};
	};

	return (
		<div>
			<div className="category-container">
				{
					loading
						? <Shimmer type="card" />
						: (
							<>
								<h2 className="section-title">Our Food Categories</h2>
								<div className="categories-grid">
									{/* First row of 7 categories */}
									<div className="category-row">
										{allCategories.slice(0, 7).map(category => (
											<div key={`first-${category.idCategory}`} onClick={handleCategoryMealClick(category.strCategory)} className="category-item">
												<img
													src={category.strCategoryThumb}
													alt={category.strCategory}
													className="category-image"
												/>
												<span className="category-name">{category.strCategory}</span>
											</div>
										))}
									</div>

									{/* Second row of 7 categories */}
									<div className="category-row">
										{allCategories.slice(7, 14).map(category => (
											<div key={`second-${category.idCategory}`} onClick={handleCategoryMealClick(category.strCategory)} className="category-item">
												<img
													src={category.strCategoryThumb}
													alt={category.strCategory}
													className="category-image"
												/>
												<span className="category-name">{category.strCategory}</span>
											</div>
										))}
									</div>
								</div>
							</>
						)
				}
			</div>
		</div >
	)

}

export default CategoryExplorer;