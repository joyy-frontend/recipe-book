import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [uploadedUser, setUploadUser] = useState('');

  const onClickEdit = (recipeId) => {
    navigate(`/recipes/edit/${recipeId}`);
  }
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipe")) || [];

    const foundRecipe = storedRecipes.find((item) => item.id === parseInt(id));

    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      alert("Recipe not found!");
    }
  }, [id]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const clickedRecipe = JSON.parse(localStorage.getItem("recipe"));
    const currentRecipe = clickedRecipe[id-1];

    if(currentUser) {
      setLoggedInUser(currentUser.email);
    }
    if(clickedRecipe) {
      setUploadUser(currentRecipe.user)
    }
  }, []);

  if (!recipe) {
    return <div className="container mt-5">Loading recipe details...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="recipe-detail">
        <div className="text-center mb-4">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
  
        <div className="recipe-meta text-center mb-5">
          <h1 className="fw-bold">{recipe.title}</h1>
          <p className="text-muted">Recipe by: {recipe.user}</p>
          <p className="text-muted">Date: {recipe.date}</p>
          {
            loggedInUser === uploadedUser &&
            <button type="submit" className="btn btn-primary" onClick={() => onClickEdit(id)}>Edit</button>
          }
        </div>
        <div className="row text-center mb-4">
          <div className="col-md-6">
            <h6 className="fw-bold">Category</h6>
            <p className="badge bg-primary">{recipe.category}</p>
          </div>
          <div className="col-md-6">
            <h6 className="fw-bold">Likes</h6>
            <p className="badge bg-danger">{recipe.likes}</p>
          </div>
        </div>
        
        <div className="recipe-content">
          <h3 className="fw-bold mb-3 text-center">How to make?</h3>
          <p>{recipe.content}</p>
        </div>
      </div>
    </div>
  );
  
}
