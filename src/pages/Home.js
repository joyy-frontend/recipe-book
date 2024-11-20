import { Link } from 'react-router-dom';
import mainPic from "../assets/images/main.png"; 
import appetizerPic from "../assets/images/appetizer.jpg";
import breakfastPic from "../assets/images/breakfast.jpg";
import lunchPic from "../assets/images/lunch.jpg";
import dinnerPic from "../assets/images/dinner.jpg";
import pastaPic from "../assets/images/pasta.jpg";
import soupPic from "../assets/images/soup.jpg";
import veganPic from "../assets/images/vegan.jpg";
import dessertPic from "../assets/images/dessert.jpg";
import seafoodPic from "../assets/images/seafood.jpg";
import saladPic from "../assets/images/salad.jpg";
import { useEffect, useState } from 'react';

export default function Home() {
    const categories = [
        {
            name: "Breakfast",
            image: breakfastPic,
            path: "/recipes?category=breakfast"
        },
        {
            name: "Lunch", 
            image: lunchPic,
            path: "/recipes?category=lunch"
        },
        {
            name: "Dinner", 
            image: dinnerPic,
            path: "/recipes?category=dinner"
        },
        {
            name: "Appetizer", 
            image: appetizerPic,
            path: "/recipes?category=appetizer"
        },
        {
            name: "Pasta", 
            image: pastaPic,
            path: "/recipes?category=pasta"
        },
        {
            name: "Soup", 
            image: soupPic,
            path: "/recipes?category=soup"
        },
        {
            name: "Vegetarian", 
            image: veganPic,
            path: "/recipes?category=vegetarian"
        },
        {
            name: "Seafood", 
            image: seafoodPic,
            path: "/recipes?category=seafood"
        },
        {
            name: "Dessert",
            image: dessertPic,
            path: "/recipes?category=dessert"
        },
        {
            name: "Salad",
            image: saladPic,
            path: "/recipes?category=salad"
        }
    ];
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const storagedRecipe = JSON.parse(localStorage.getItem('recipe'));
        if(storagedRecipe) {
            setRecipes(storagedRecipe);
        }
    }, []);
    return (
        <div className="home-container">
            <header className="hero-header">
                <div className="hero-content">
                    <div className="hero-text">
                        <h2 className="hero-title">Cooking Made Fun and Easy: Unleash Your Inner Chef</h2>
                        <p className="hero-description">Discover recipes in your hand with the best recipe. Help you to find the easiest way to cook.</p>
                        <div className="btn-wrapper">
                            <Link to="/recipes" className="hero-btn">
                                Explore Recipes
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={mainPic} alt="main" />
                    </div>
                </div>
            </header>

            <section className="categories-section">
                <h2 className="categories-title">Popular Categories</h2>
                <div className="categories-grid">
                    {categories.map((category, index) => (
                        <Link to={category.path} key={index} className="category-card">
                            <div className="category-image-container">
                                <img src={category.image} alt={category.name} className="category-image" />
                            </div>
                            <h3 className="category-name">{category.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="categories-title">Latest Recipe</h2>
                <div className='container py-5'>
                    <div className='row g-4'>
                        {recipes.length > 0 ?
                            recipes.map((recipe, idx) => (
                            <div className='col-md-4' key={recipe.id}>
                                <div className='recipe-card'>
                                    <Link to={`/recipes/${recipe.id}`} className="card h-100 text-decoration-none">
                                        <img 
                                            src={recipe.image} 
                                            alt={recipe.title} 
                                            className="recipe-image" 
                                        />
                                        <div className='recipe-content'>
                                            <h3 className="card-title">{recipe.title}</h3>
                                            <p className="card-text">
                                                <i className="fas fa-user me-2"></i>
                                                Recipe by {recipe.user}
                                            </p>
                                            <p className="card-text">
                                                <i className="fas fa-tag me-2"></i>
                                                <strong>Category:</strong> {recipe.category}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )) :    
                            <div className="no-data">
                                <i className="fas fa-search mb-3 d-block" style={{fontSize: "2rem"}}></i>
                                There is no Recipe
                            </div> 
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}