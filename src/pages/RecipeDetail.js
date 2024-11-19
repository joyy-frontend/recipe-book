import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [uploadedUser, setUploadUser] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const onClickEdit = (recipeId) => {
    navigate(`/recipes/edit/${recipeId}`);
  };

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipe")) || [];

    const foundRecipe = storedRecipes.find((item) => item.id === parseInt(id));

    if (foundRecipe) {
      setRecipe(foundRecipe);
      setComments(foundRecipe.comments || []); // Initialize comments from the recipe
    } else {
      alert("Recipe not found!");
    }
  }, [id]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const clickedRecipe = JSON.parse(localStorage.getItem("recipe"));
    const currentRecipe = clickedRecipe[id - 1];

    if (currentUser) {
      setLoggedInUser(currentUser.email);
    }
    if (clickedRecipe) {
      setUploadUser(currentRecipe.user);
    }
  }, []);

  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    const updatedComments = [
      ...comments,
      { user: loggedInUser, text: newComment, date: new Date().toLocaleString() },
    ];

    setComments(updatedComments);
    setNewComment("");

    // Update comments in localStorage
    const storedRecipes = JSON.parse(localStorage.getItem("recipe")) || [];
    const updatedRecipes = storedRecipes.map((item) => {
      if (item.id === parseInt(id)) {
        return { ...item, comments: updatedComments };
      }
      return item;
    });
    localStorage.setItem("recipe", JSON.stringify(updatedRecipes));
  };

  if (!recipe) {
    return <div className="container mt-5">Loading recipe details...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="recipe-detail">
        <div className="text-center mb-4">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>

        <div className="recipe-meta text-center mb-5">
          <h1 className="fw-bold">{recipe.title}</h1>
          <p className="text-muted">Recipe by: {recipe.user}</p>
          <p className="text-muted">Date: {recipe.date}</p>
          {loggedInUser === uploadedUser && (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => onClickEdit(id)}
            >
              Edit
            </button>
          )}
        </div>
        <div className="row text-center mb-4">
          <div className="col-md-6">
            <h6 className="fw-bold">Category</h6>
            <p className="badge bg-primary">{recipe.category}</p>
          </div>
          <div className="col-md-6">
            <h6 className="fw-bold">Likes</h6>
            <p className="badge bg-danger">{recipe.likes}</p>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="recipe-ingredients">
          <h3 className="fw-bold mb-3 text-center">Ingredients</h3>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <ul className="list-group mb-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="list-group-item">
                  {ingredient}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No ingredients provided for this recipe.</p>
          )}
        </div>

        {/* How to Make Section */}
        <div className="recipe-content">
          <h3 className="fw-bold mb-3 text-center">How to make?</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{recipe.content}</p>
        </div>

        {/* Comments Section */}
        <div className="comments-section mt-5">
          <h3 className="fw-bold mb-4 text-center">Comments</h3>
          <div className="comment-list">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment mb-3">
                  <p>
                    <strong>{comment.user}</strong> <span className="text-muted">({comment.date})</span>
                  </p>
                  <p>{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-center">No comments yet. Be the first to comment!</p>
            )}
          </div>
          <div className="comment-form mt-4">
            <textarea
              className="form-control mb-2"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button className="btn btn-primary" onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
