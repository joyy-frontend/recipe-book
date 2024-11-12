import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipePost() {
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState({ 
        id: 0,
        title: '', 
        user: '', 
        content: '', 
        category: '', 
        image: '' 
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        let storageData = JSON.parse(localStorage.getItem("recipe")) || [];
        if(recipeId) {
            const index = storageData.findIndex(item => item.id === parseInt(recipeId, 10));

            if(index !== -1) {
                storageData[index] = { ...recipe, id: parseInt(recipeId, 10)};
                localStorage.setItem("recipe", JSON.stringify(storageData));
                alert("Recipe updated Successfully");
                navigate('/recipes');
            } else {
                alert("Recipe not found for editing");
            }
        } else {
            const newData = {
                ...recipe,
                id: storageData.length + 1
            }
            storageData.push(newData);
            localStorage.setItem("recipe", JSON.stringify(storageData));
            alert("Recipe saved successfully");
            navigate('/recipes')
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setRecipe({ ...recipe, image: reader.result });
        };

        if(file) {
            reader.readAsDataURL(file);
        }
    }
    useEffect(() => {
        if(recipeId) {
            const storageData = JSON.parse(localStorage.getItem('recipe')) || [];
            const currentData = storageData.find(item => item.id === parseInt(recipeId));
            console.log('storageData >>>>', storageData);
            console.log('currentData >>>> ', currentData);
            if(currentData) {
                setRecipe(currentData);
            }
        }
    }, [recipeId]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user) {
            setRecipe(prev => ({
                ...prev, user: user.email
            }))
            // setRecipe({...recipe, user: user.email})
        } else {
            alert("Please Login first");
            navigate(-1);
        }
        
        const today = new Date().toISOString().split("T")[0];
        setDate(today);    
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{recipeId ? 'Recipe Detail' : 'Recipe Post'}</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        onChange={(e) => setRecipe({...recipe, title: e.target.value })} 
                        value={recipe.title}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label for="user" className="form-label">User</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="user" 
                        onChange={(e) => setRecipe({...recipe, user: e.target.value })} 
                        value={recipe.user} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label for="content" className="form-label">Content</label>
                    <textarea 
                        className="form-control" 
                        id="content" 
                        rows="3" 
                        onChange={(e) => setRecipe({...recipe, content: e.target.value })} 
                        value={recipe.content}  
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select" id="category" value={recipe.category} onChange={(e) => setRecipe({...recipe, category: e.target.value })}required>
                        <option value="">Select Category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="salad">Salad</option>
                        <option value="dessert">Dessert</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="soup">Soup</option>
                        <option value="seafood">Seafood</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label for="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" value={date} readOnly/>
                </div>
                <div className="mb-3">
                    <label for="img" className="form-label">Image</label>
                    <input type="file" className="form-control" id="img" accept="image/*" onChange={handleImageChange} />
                </div>
                {
                    recipe.image && (
                        <div className="mb-3">
                            <img src={recipe.image} alt="Preview" style={{ width: "300px", height: "300px" }} />
                        </div>
                    )
                }
                <button type="submit" className="btn btn-primary">{recipeId ? "Update Recipe" : "Create Recipe"}</button>
            </form>
        </div>
    );
}