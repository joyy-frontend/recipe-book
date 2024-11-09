import { useNavigate } from 'react-router-dom';
import AllRecipes from '../components/AllRecipes';

export default function RecipeList() {
    const navigate = useNavigate();
    const handleClick = () => {
    navigate('/recipes/new')
  }
    return (
        <div class="container">
            <div class="row">
                <div class="col-6"></div>
                <div class="col-6 d-flex justify-content-end">
                    <div class="btn-group d-flex justify-content-end" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary" onClick={handleClick}>ADD</button>
                    </div>
                </div>
            </div>
                    <AllRecipes />
        </div>

    );
}
