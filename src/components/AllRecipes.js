import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/images/logo.png";

const AllRecipes = ({ category, PropsRecipes, searchWord }) => {
  const [recipes, setRecipes] = useState(PropsRecipes);

  useEffect(() => {
    setRecipes(PropsRecipes);
  }, [PropsRecipes]);

  const filteredRecipes = recipes.filter((recipe) => {

    const resultCategory = 
      category.toLowerCase().trim() === "all" || 
      recipe.category.toLowerCase().trim() === category.toLowerCase().trim();

    const resultSearch =
      searchWord === "" ||
      recipe.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      recipe.user.toLowerCase().includes(searchWord.toLowerCase()) ||
      recipe.content.toLowerCase().includes(searchWord.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchWord.toLowerCase());

      console.log(resultCategory, resultSearch); // T T, T F, F F 이런식으로 찍힘
      
    return resultCategory && resultSearch;
    
  });
  

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">All Recipes</h2>
      <div className="row g-4">
      {/* {PropsRecipes.map((recipe) => (
          <div className="col-md-4" key={recipe.id}>
            <div className="recipe-card">
              <Link to={`/recipes/${recipe.id}`}> 
                 <img
                  src={recipe.image
                    ? require(`../assets/images/${recipe.image}`)
                    : logoImage}
                  alt={recipe.title}
                  style={{ maxWidth: "250px" }}
                /> 
                {/* <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ maxWidth: "250px" }}
                /> */}
        {filteredRecipes.map((recipe) => (
          <div className="col-md-4" key={recipe.id}>
            <div className="recipe-card">
              <Link to={`/recipes/${recipe.id}`}>
                <img
                  src={recipe.image ? recipe.image : logoImage}
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
      </div>
    </div>
  );
};

export default AllRecipes;
