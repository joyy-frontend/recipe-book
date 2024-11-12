import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pizza from "../assets/images/pizza.png";
import logoImage from "../assets/images/logo.png";

const AllRecipes = ({category, PropsRecipes}) => {
  console.log(PropsRecipes)
  const [recipes, setRecipes] = useState([]);

  // useEffect(() => {
  //   fetch("/dummy.json")
  //     .then((response) => response.json())
  //     .then((data) => setRecipes(data))
  //     .catch((error) => console.error("Error loading recipes:", error));
  // }, []);

  console.log(
    recipes.map((recipe) => {
        return recipe.image;
    })
);

const filteredRecipes = category === "All"
? recipes : recipes.filter(recipe => recipe.category === category);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">All Recipes</h2>
      <div className="row g-4">
        {PropsRecipes.map((recipe) => (
          <div className="col-md-4" key={recipe.id}>
            <div className="recipe-card">
              <Link to={`/recipes/${recipe.id}`}>
                {/* <img
                  src={recipe.image
                    ? require(`../assets/images/${recipe.image}`)
                    : logoImage}
                  alt={recipe.title}
                  style={{ maxWidth: "250px" }}
                /> */}
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ maxWidth: "250px" }}
                />
                <div>
                  <h3 className="card-title">{recipe.title}</h3>
                  <p className="card-text">Recipe by {recipe.user}</p>
                  <p className="card-text">
                    <strong>Category:</strong> {recipe.category}
                  </p>
                  <p className="card-text">
                    <strong>Likes:</strong> {recipe.likes}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}

        {/* <div className="col-md-4">
          <div className="recipe-card">
            <img src={pizza} alt="Healthy Green Smoothie" />
            <h3 className="recipe-title">Delicious Chocolate Cake</h3>
            <p className="recipe-description">
              Rich, moist, and decadent chocolate cake that everyone loves.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="recipe-card">
            <img src={pizza} alt="Healthy Green Smoothie" />
            <h3 className="recipe-title">Healthy Green Smoothie</h3>
            <p className="recipe-description">
              A refreshing and healthy smoothie made with spinach, kale, and
              fruit.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AllRecipes;
