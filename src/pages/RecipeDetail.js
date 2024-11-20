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
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const onClickEditRecipe = (recipeId) => {
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

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditedComment(comments[index].text);
  };

  const handleSaveEditedComment = () => {
    const updatedComments = comments.map((comment, index) => {
      if (index === editingCommentIndex) {
        return { ...comment, text: editedComment };
      }
      return comment;
    });

    setComments(updatedComments);
    setEditingCommentIndex(null);
    setEditedComment("");

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

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);

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

          //console.log(loggedInUser);
          console.log(uploadedUser);
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
          <h1 className="recipe-name">{recipe.title}</h1>
          <p className="text-muted">Recipe by: {recipe.user}</p>
          <p className="text-muted">Date: {recipe.date}</p>
          

          {loggedInUser === uploadedUser && (
            <button
              type="submit"
              className="edit-btn btn-primary"
              onClick={() => onClickEditRecipe(id)}
            >
              Edit
            </button>
          )}
        </div>

        <div className="row text-center mb-4">
          <div className="col-md-6">
            <h6 className="side-title">Category</h6>
            <p className="badge bg-primary">{recipe.category}</p>
          </div>
          <div className="col-md-6">
            <h6 className="side-title">Likes</h6>
            <p className="badge bg-danger">{recipe.likes}</p>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="recipe-ingredients">
          <h3 className="ingredients-title">Ingredients</h3>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <ul className="list-group mb-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="list-group-item">
                  {ingredient}
                </li>
              ))}
            </ul>
          ) : (
            <p className="info-p text-center">No ingredients provided for this recipe.</p>
          )}
        </div>

        {/* How to Make Section */}
        <div className="recipe-content-in">
          <h3 className="make-title">How to make?</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{recipe.content}</p>
        </div>

        {/* Comments Section */}
        <div className="comments-section mt-5">
          <h3 className="comment-title">Comments</h3>
          <div className="comment-list">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment mb-3">
                  <p>
                    <strong>{comment.user}</strong> <span className="text-muted">({comment.date})</span>
                  </p>
                  {editingCommentIndex === index ? (
                    <div>
                      <textarea
                        className="form-control mb-2"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                      ></textarea>
                      <button
                        className="edit-co-btn btn-success me-2"
                        onClick={handleSaveEditedComment}
                      >
                        Save
                      </button>
                      <button
                        className="delete-co-btn btn-secondary"
                        onClick={() => setEditingCommentIndex(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p>{comment.text}</p>
                  )}
                  {comment.user === loggedInUser && editingCommentIndex !== index && (
                    <div>
                      <button
                        className="edit-co-btn btn-sm btn-warning me-2"
                        onClick={() => handleEditComment(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-co-btn btn-sm btn-danger"
                        onClick={() => handleDeleteComment(index)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="info-p text-center">No comments yet. Be the first to comment!</p>
            )}
          </div>
          <div className="comment-form mt-4">
            <textarea
              className="form-control mb-2"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button className="add-btn btn-primary" onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
