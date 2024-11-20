import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../http-common"; // http-common 파일 설정 사용
import logoImage from "../assets/images/logo.png";

const AllRecipes = ({ category, searchWord }) => {
  const [recipes, setRecipes] = useState([]); // LocalStorage 데이터
  const [dummyRecipes, setDummyRecipes] = useState([]); // dummy.json 데이터
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  // LocalStorage 데이터 가져오기
  useEffect(() => {
    const localStoragedData = JSON.parse(localStorage.getItem("recipe")) || [];
    setRecipes(localStoragedData);
  }, []);

  // axios로 dummy.json 데이터 가져오기
  useState(() => {
    const fetchDummyData = async () => {
      try {
        const storedRecipes = JSON.parse(localStorage.getItem("recipe")) || [];
        const hasDummyData = storedRecipes.some((recipe) => recipe.isDummy);
  
        if (!hasDummyData) {
          const response = await axios.get("dummy.json");
          const dummyData = response.data.recipes.map((recipe) => ({
            ...recipe,
            isDummy: true, // Mark dummy recipes
          }));
          setDummyRecipes(dummyData);
          localStorage.setItem("recipe", JSON.stringify([...storedRecipes, ...dummyData]));
        }
      } catch (error) {
        console.error("Error fetching dummy.json data:", error);
      }
    };
    fetchDummyData();
  }, []);
  

  useEffect(() => {
    // 현재 사용자 가져오기
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setCurrentUser(currentUser.email);
    }
  }, []);

  const onClickDel = (recipeId) => {
    let storageData = JSON.parse(localStorage.getItem("recipe")) || [];
    const updatedData = storageData.filter(
      (item) => item.id !== parseInt(recipeId)
    );

    localStorage.setItem("recipe", JSON.stringify(updatedData));
    alert("Recipe deleted successfully");

    setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    navigate(0); // 페이지 새로고침
  };

  const handleLiked = (recipeId) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        const alreadyLiked = recipe.likedBy?.includes(currentUser); // 좋아요 여부 확인
        const updatedLikedBy = alreadyLiked
          ? recipe.likedBy.filter((email) => email !== currentUser) // 좋아요 취소
          : [...(recipe.likedBy || []), currentUser]; // 좋아요 추가

        return {
          ...recipe,
          likedBy: updatedLikedBy,
          likes: updatedLikedBy.length, // 좋아요 수 갱신
        };
      }
      return recipe;
    });

    // 상태 및 LocalStorage 업데이트
    setRecipes(updatedRecipes);
    localStorage.setItem("recipe", JSON.stringify(updatedRecipes));
  };

  // 필터링 로직
  const filterByCategoryAndSearch = (data) => {
    const arrayCategories = Array.isArray(category)
      ? category.map((cate) => cate.toLowerCase().trim())
      : [category.toLowerCase().trim()];

    return data.filter((recipe) => {
      const recipeCategories = recipe.category
        .toLowerCase()
        .split(",")
        .map((cate) => cate.trim());

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
  };

  const filteredDummyRecipes = filterByCategoryAndSearch(dummyRecipes);
  const filteredLocalRecipes = filterByCategoryAndSearch(recipes);

  return (
    <div className="container py-5">
      <div className="row g-4">
        {[...filteredDummyRecipes, ...filteredLocalRecipes].map((recipe) => (
          <div className="col-md-4" key={recipe.id}>
            <div className="recipe-card">
              {/* <Link to={recipe.isDummy ? "#" : `/recipes/${recipe.id}`}> */}
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
                {/* // LocalStorage용 Like 버튼 (동작 가능) */}
                  <button
                    className={`recipe-btn like-btn ${
                      recipe.likedBy?.includes(currentUser) ? "active" : ""
                    }`}
                    onClick={() => handleLiked(recipe.id)}
                  >
                    <i className="fas fa-heart"></i>
                    <span>
                      {recipe.likedBy?.includes(currentUser) ? " Liked" : " Like"}
                    </span>
                  </button>
                {recipe.user === currentUser && (
                  <button
                    type="button"
                    className="recipe-btn delete-btn"
                    onClick={() => onClickDel(recipe.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                    <span> Delete</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
