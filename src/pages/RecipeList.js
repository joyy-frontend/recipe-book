import { useNavigate } from "react-router-dom";
import AllRecipes from "../components/AllRecipes";
import { useEffect, useState } from "react";

export default function RecipeList() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    const localStoragedData = JSON.parse(localStorage.getItem('recipe'));
    setRecipes(localStoragedData);
  }, []);

  const handleClick = () => {
    navigate("/recipes/new");
  };
  const handleCategory = (category) => {
    setCategory(category);
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
            <div className="d-flex justify-content align-items-center mb-4">
              <h1 className="mx-auto">Recipes</h1>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                style={{ width: '10%' }}
              >
                ADD
              </button>
            </div>
            <AllRecipes category = {category} PropsRecipes={recipes}/>
          </main>
        </div>
      </div>
    </>
  );
}
