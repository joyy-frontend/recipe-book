import { useNavigate } from 'react-router-dom';
import AllRecipes from '../components/AllRecipes';
import { useState } from 'react';

export default function RecipeList() {
    const navigate = useNavigate();

    const handleClick = () => {
    navigate('/recipes/new')
  }
    return (
        <>
        <div className="container-fluid">
        <div className="row">
            <aside className={`col-md-3 d-none d-md-block`}>
                <div className="p-3">
                    <h2 className="text-center">Categories</h2>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Breakfast</li>
                        <li className="list-group-item">Lunch</li>
                        <li className="list-group-item">Dinner</li>
                        <li className="list-group-item">Appetizer</li>
                        <li className="list-group-item">Salad</li>
                        <li className="list-group-item">Dessert</li>
                        <li className="list-group-item">Vegetarian</li>
                        <li className="list-group-item">Soup</li>
                        <li className="list-group-item">Seafood</li>
                    </ul>
                </div>
            </aside>

            <main className="col-md-9">
                    <h1>Recipes</h1>
                    <div className="btn-group mb-4" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" onClick={handleClick}>ADD</button>
                    </div>
                    <AllRecipes />
                </main>
            </div>
            </div>
        </>

    );
}
