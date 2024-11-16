import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/logo.png";

const AllRecipes = ({ category, PropsRecipes, searchWord, handleLiked }) => {
  const [recipes, setRecipes] = useState(PropsRecipes);
  const navigate = useNavigate();

  useEffect(() => {
    setRecipes(PropsRecipes);
  }, [PropsRecipes]);

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
      <h2 className="text-center mb-4">All Recipes</h2>
      <div className="row g-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div className="col-md-4" key={recipe.id}>
              <div className="recipe-card">
                <Link to={`/recipes/${recipe.id}`}>
                  <img
                    src={recipe.image ? recipe.image : logoImage}
                    alt={recipe.title}
                    style={{ width: "250px", height: "250px" }}
                  />
                  <div>
                    <h3 className="card-title">{recipe.title}</h3>
                    <p className="card-text">Recipe by {recipe.user}</p>
                    <p className="card-text">
                      <strong>Category:</strong> {recipe.category}
                    </p>
                    <p className="card-text" style={{ paddingBottom: '10px'}}>
                      <strong>Likes:</strong> {recipe.likes}
                    </p>
                  </div>
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  style={{ width: "40%", textAlign: "center" }}
                  onClick={() => onClickDel(recipe.id)}
                >
                  Delete
                </button>
                <button
                className={`btn ${recipe.liked ? "btn-danger" : "btn-outline-danger"}`}
                style={{ width: "40%", textAlign: "center" }}
                onClick={() => handleLiked(recipe.id)}
              >
                Like
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-6">There is no Data</div>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
