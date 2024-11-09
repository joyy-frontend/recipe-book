import React from 'react'
import { Link } from 'react-router-dom';
import pizza from '../assets/images/pizza.png';

const AllRecipes = () => {
  return (
    <div class="container py-5">
      <h2 class="text-center mb-4">All Recipes</h2>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="recipe-card">
            <Link to='/recipes/1'>
              <img src={pizza} alt="Healthy Green Smoothie" />
              <h3 class="recipe-title">Super Delicious Pasta</h3>
              <p class="recipe-description">A mouthwatering pasta with a creamy sauce, perfect for any occasion.</p>
            </Link>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="recipe-card">
            <img src={pizza} alt="Healthy Green Smoothie" />
            <h3 class="recipe-title">Delicious Chocolate Cake</h3>
            <p class="recipe-description">Rich, moist, and decadent chocolate cake that everyone loves.</p>
            {/* <a href="#" class="recipe-btn">Read More</a> */}
          </div>
        </div>
        <div class="col-md-4">
          <div class="recipe-card">
            <img src={pizza} alt="Healthy Green Smoothie" />
            <h3 class="recipe-title">Healthy Green Smoothie</h3>
            <p class="recipe-description">A refreshing and healthy smoothie made with spinach, kale, and fruit.</p>
            {/* <a href="#" class="recipe-btn">Read More</a> */}
          </div>
        </div>
      </div>
  </div>
  )
}

export default AllRecipes
