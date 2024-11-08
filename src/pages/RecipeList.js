import { useNavigate } from 'react-router-dom';
import AllRecipes from '../components/AllRecipes';

export default function RecipeList() {
    const navigate = useNavigate();
    const handleClick = () => {
    navigate('/recipes/new')
  }
    return (
        <>
            <h1>Recipes</h1>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary" onClick={handleClick}>ADD</button>
            </div>
            <AllRecipes />
        </>

    );
}
