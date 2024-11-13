import { Link, useNavigate } from "react-router-dom";

const AllRecipes = ({category, PropsRecipes}) => {
  const navigate = useNavigate();

  const onClickDel = (recipeId) => {
    let storageData = JSON.parse(localStorage.getItem('recipe')) || [];
    const updatedData = storageData.filter(item => item.id !== parseInt(recipeId));

    localStorage.setItem("recipe", JSON.stringify(updatedData));

    alert("Recipe deleted successfully");
    navigate(0);
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">All Recipes</h2>
      <div className="row g-4">
        {
          PropsRecipes ?
            PropsRecipes.map((recipe) => (
              <div className="col-md-4" key={recipe.id}>
                <div className="recipe-card">
                  <Link to={`/recipes/${recipe.id}`}>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      style={{ width: '250px', height: '250px' }}
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
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    style={{ width: '40%', textAlign:'center' }}
                    onClick={()=> onClickDel(recipe.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
          )) : <div className="text-center mt-6">There is no Data</div>
        }
      </div>
    </div>
  );
};

export default AllRecipes;
