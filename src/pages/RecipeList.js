import { useNavigate } from "react-router-dom";
import AllRecipes from "../components/AllRecipes";
import { useEffect, useState } from "react";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const localStoragedData = JSON.parse(localStorage.getItem("recipe"));

   // 데이터가 배열이 아닌 경우 배열로 감싸서 설정함. --> filter()할때 배열로 받아와야되어서..
    if (localStoragedData) {
      const processedData = Array.isArray(localStoragedData)
        ? localStoragedData
        : [localStoragedData];

       // localstorage 객체를 불러올때 순차적으로 id를 추가해서 저장함--> 안 추가하면 map돌릴때 warning 떠서 가져올때 id도 같이 배열에 저장함.
      const dataWithId = processedData.map((recipe, index) => ({
        ...recipe,
        id: recipe.id || index + 1,
        liked: recipe.liked || false, //기본값
      }));

      setRecipes(dataWithId);
    } else {
      setRecipes([]); // localStorage에 데이터가 없으면 빈 배열로 설정함. 
    }
  }, []);

  const handleLiked = (recipeId) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        const updatedLikes = recipe.liked ? recipe.likes - 1 : recipe.likes + 1; // 좋아요 상태에 따라 증가/감소
        return { ...recipe, likes: updatedLikes, liked: !recipe.liked }; // liked 상태 업데이트
      }
      return recipe;
    });
  
    setRecipes(updatedRecipes);
    localStorage.setItem("recipe", JSON.stringify(updatedRecipes));
  };
  

  const handleClick = () => {
    navigate("/recipes/new");
  };

  const handleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSearch = (e) => {
    const word = e.target.value;
    setSearchWord(word);
  };

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Appetizer",
    "Salad",
    "Dessert",
    "Vegetarian",
    "Soup",
    "Seafood",
  ];

  const getCategoryIcon = (category) => {
    const icons = {
      'All': 'fa-th-large',
      'Breakfast': 'fa-coffee',
      'Lunch': 'fa-utensils',
      'Dinner': 'fa-moon',
      'Appetizer': 'fa-cheese',
      'Salad': 'fa-leaf',
      'Dessert': 'fa-ice-cream',
      'Vegetarian': 'fa-carrot',
      'Soup': 'fa-mug-hot',
      'Seafood': 'fa-fish'
    };
    return icons[category] || 'fa-th-large';
  };
  
  return (
    <div className="container-fluid">
      <div className="row">
              <h1 className="title">Recipes</h1>
        <aside className="col-md-3 d-none d-md-block">
          <div className="categories-sidebar">
            {/* <h2 className="categories-title">Categories</h2> */}
            <div className="category-buttons">
              {categories.map((cate) => (
                <button
                  key={cate}
                  className={`category-btn ${category === cate ? "active" : ""}`}
                  onClick={() => handleCategory(cate)}
                >
                  {/* 아이콘 추가 */}
                  <i className={`fas ${getCategoryIcon(cate)} me-2`}></i>
                  {cate}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="col-md-9">
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search recipes..."
              value={searchWord}
              onChange={handleSearch}
            />
            <button
              type="button"
              className="add-recipe-btn"
              onClick={handleClick}
            >
              <i className="fas fa-plus"></i>
              Add Recipe
            </button>
          </div>
        </div>

        <AllRecipes 
          category={category} 
          PropsRecipes={recipes} 
          searchWord={searchWord} 
          handleLiked={handleLiked} 
        />
      </main>
      </div>
    </div>
  );
}
