import { useNavigate, useLocation } from "react-router-dom";
import AllRecipes from "../components/AllRecipes";
import { useEffect, useState } from "react";

export default function RecipeList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  const [category, setCategory] = useState(initialCategory?.charAt(0).toUpperCase() + initialCategory?.slice(1) || "All");

  const setCategoryHandler = (selectedCategory) => {
    setCategory(selectedCategory);
    navigate(`/recipes?category=${selectedCategory.toLowerCase()}`);
};

  useEffect(() => {
    const localStoragedData = JSON.parse(localStorage.getItem("recipe"));

    if (localStoragedData) {
      const processedData = Array.isArray(localStoragedData)
        ? localStoragedData
        : [localStoragedData];

      const dataWithId = processedData.map((recipe, index) => ({
        ...recipe,
        id: recipe.id || index + 1,
        liked: recipe.liked || false, 
      }));

      setRecipes(dataWithId);
    } else {
      setRecipes([]); 
    }
  }, []);


  const handleClick = () => {
    navigate("/recipes/new");
  };

  // const handleCategory = (selectedCategory) => {
  //   setCategory(selectedCategory);
  // };

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
                  onClick={() => setCategoryHandler(cate)}
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
        />
      </main>
      </div>
    </div>
  );
}
