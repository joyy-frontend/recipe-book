import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/logo.png";

const AllRecipes = ({ category, PropsRecipes, searchWord, handleLiked }) => {
  const [recipes, setRecipes] = useState(PropsRecipes);
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setRecipes(PropsRecipes);
  }, [PropsRecipes]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(currentUser.email);
  }, []);

  const onClickDel = (recipeId) => {
    let storageData = JSON.parse(localStorage.getItem("recipe")) || [];
    const updatedData = storageData.filter(
      (item) => item.id !== parseInt(recipeId)
    );

    localStorage.setItem("recipe", JSON.stringify(updatedData));
    alert("Recipe deleted successfully");

    setRecipes(updatedData);
    navigate(0);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    // category가 배열이 아니면 배열로 바꿔야됨 --> map돌릴거라서
    const arrayCategories = Array.isArray(category)
      ? category.map((cate) => cate.toLowerCase().trim())
      : [category.toLowerCase().trim()];

    const recipeCategories = recipe.category
      .toLowerCase()
      .split(",")
      .map((cate) => cate.trim()); // ,(컴마) 기준으로 자름. "salad, appetizer" -> ["salad", "appetizer"]
    console.log(recipeCategories);

    const resultCategory =
      arrayCategories.includes("all") ||
      recipeCategories.some((cate) => arrayCategories.includes(cate));

    const resultSearch =
      searchWord === "" ||
      (recipe.title &&
        recipe.title.toLowerCase().includes(searchWord.toLowerCase().trim())) ||
      (recipe.user &&
        recipe.user.toLowerCase().includes(searchWord.toLowerCase().trim())) ||
      (recipe.content &&
        recipe.content
          .toLowerCase()
          .includes(searchWord.toLowerCase().trim())) ||
      (recipe.category &&
        recipe.category
          .toLowerCase()
          .includes(searchWord.toLowerCase().trim()));

    return resultCategory && resultSearch;
  });

  return (
    <div className="container py-5">
      <div className="row g-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div className="col-md-4" key={recipe.id}>
              <div className="recipe-card">
                <Link to={`/recipes/${recipe.id}`}>
                  <img
                    src={recipe.image ? recipe.image : logoImage}
                    alt={recipe.title}
                    className="recipe-image"
                  />
                  <div className="recipe-content">
                    <h3 className="card-title">{recipe.title}</h3>
                    <p className="card-text">
                      <i className="fas fa-user me-2"></i>
                      Recipe by {recipe.user}
                    </p>
                    <p className="card-text">
                      <i className="fas fa-tag me-2"></i>
                      <strong>Category:</strong> {recipe.category}
                    </p>
                    <p className="card-text">
                      <i className="fas fa-heart me-2"></i>
                      <strong>Likes:</strong> {recipe.likes}
                    </p>
                  </div>
                </Link>
                <div className="recipe-buttons">
                  {recipe.user === currentUser && (
                    <button
                      type="button"
                      className="recipe-btn delete-btn"
                      onClick={() => onClickDel(recipe.id)}
                    >
                      <i className="fas fa-trash-alt me-2"></i>
                      Delete
                    </button>
                  )}
                  <button
                    className={`recipe-btn like-btn ${recipe.liked ? "active" : ""}`}
                    onClick={() => handleLiked(recipe.id)}
                  >
                    <i className="fas fa-heart me-2"></i>
                    {recipe.liked ? "Liked" : "Like"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">
            <i className="fas fa-search mb-3 d-block" style={{fontSize: "2rem"}}></i>
            There is no Data
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
