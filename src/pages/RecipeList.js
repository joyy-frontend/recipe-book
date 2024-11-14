import { useNavigate } from "react-router-dom";
import AllRecipes from "../components/AllRecipes";
import { useEffect, useState } from "react";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const localStoragedData = JSON.parse(localStorage.getItem('recipe'));
    
    // 데이터가 배열이 아닌 경우 배열로 감싸서 설정함. --> filter()할때 배열로 받아와야되어서..
    if (localStoragedData) {
      const processedData = Array.isArray(localStoragedData)
      ? localStoragedData
      : [localStoragedData];
    // localstorage 객체를 불러올때 순차적으로 id를 추가해서 저장함--> 안 추가하면 map돌릴때 warning 떠서 가져올때 id도 같이 배열에 저장함.
    const dataWithId = processedData.map((recipe, index) => ({
      ...recipe,
      id: recipe.id || index + 1, 
    }));

    setRecipes(dataWithId);
  } else {
    setRecipes([]); // localStorage에 데이터가 없으면 빈 배열로 설정함.
  }
}, []);

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
            <div className="d-flex justify-content align-items-center mb-4">
              <h1 className="mx-auto">Recipes</h1>
            </div>
            <input
                type="text"
                placeholder="Search..."
                style={{width : "100%"}}
                value={searchWord}
                onChange={handleSearch}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClick}
              style={{ width: '30%' }}
            >
              ADD
            </button>
            <AllRecipes category = {category} PropsRecipes={recipes} searchWord = {searchWord}/>
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
