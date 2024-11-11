import React from "react";
import { Link } from "react-router-dom";
import pizza from "../assets/images/pizza.png";
import logoImage from "../assets/images/logo.png";

const AllRecipes = ({ recipes, category, searchWord }) => {
  const filteredRecipes = recipes.filter((recipe) => {
    const resultCategory = category === "All" || recipe.category === category;
    const resultSearch =
      recipe.title.toLowerCase().includes(searchWord) ||
      recipe.author.toLowerCase().includes(searchWord) ||
      recipe.category.toLowerCase().includes(searchWord) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchWord)
      ) ||
      recipe.instructions.some((instruction) =>
        instruction.toLowerCase().includes(searchWord)
      );

    //console.log("resultCategory:",resultCategory,"resultSearch:",resultSearch);

    return resultCategory && resultSearch;
  });

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">All Recipes</h2>
      <div className="row g-4">
        {filteredRecipes.map((recipe) => (
          <div className="col-md-4" key={recipe.id}>
            <div className="recipe-card">
              <Link to={`/recipes/${recipe.id}`}>
                <img
                  src={
                    recipe.image
                      ? require(`../assets/images/${recipe.image}`)
                      : logoImage
                  }
                  alt={recipe.title}
                  style={{ maxWidth: "250px" }}
                />

                <div>
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">Recipe by {recipe.author}</p>
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

        <div className="col-md-4">
          <div className="recipe-card">
            <img src={pizza} alt="Healthy Green Smoothie" />
            <h3 className="recipe-title">Delicious Chocolate Cake</h3>
            <p className="recipe-description">
              Rich, moist, and decadent chocolate cake that everyone loves.
            </p>
            {/* <a href="#" class="recipe-btn">Read More</a> */}
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
            {/* <a href="#" class="recipe-btn">Read More</a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
