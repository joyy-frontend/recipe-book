import { useNavigate } from "react-router-dom";
import AllRecipes from "../components/AllRecipes";
import { useState, useEffect } from "react";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [searchWord, setSearchWord] = useState("");
  
  useEffect(() => {
    fetch("/dummy.json")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error loading recipes:", error));
  }, []);

  console.log(
    recipes.map((recipe) => {
        return recipe.image;
    })
);
  
  const handleClick = () => {
    navigate("/recipes/new");
  };
  const handleCategory = (category) => {
    setCategory(category);
  };


  const handleSearch = (e)=>{
    const word = e.target.value;
    setSearchWord(word);

    console.log(word);

    
  }

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

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <aside className={`col-md-3 d-none d-md-block`}>
            <div className="p-3">
              <h2 className="text-center">Categories</h2>
              <ul className="list-group list-group-flush">
                {categories.map((cate) => (
                  <li
                    key={cate}
                    className={`list-group-item ${
                      category === cate ? "active" : ""
                    }`}
                    onClick={() => handleCategory(cate)}
                    style={{ cursor: "pointer" }}
                  >
                    {cate}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="col-md-9">
            <h1>Recipes</h1>
            <input
                type="text"
                placeholder="Search..."
                style={{width : "100%"}}
                value={searchWord}
                onChange={handleSearch}
            />
            <div
              className="btn-group mb-4"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                ADD
              </button>
            </div>
            <AllRecipes recipes={recipes} category = {category} searchWord = {searchWord}/>
          </main>
        </div>
      </div>
    </>
  );
}
