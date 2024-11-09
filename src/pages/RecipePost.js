import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RecipePost() {
    const [date, setDate] = useState('');
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState({ title: '', user: '', content: '', category: '', image: '' });
    const handleSubmit = () => {
        if(recipeId) {
            // 기존 레시피 정보 수정 (edit)
        } else {
            // 새로운 레시피 생성 (create)
        }
    }

    const handleImageChange = (e) => {
        setRecipe({ ...recipe, image: e.target.files[0] });
    }
    useEffect(() => {
        // 예를들어 fetch() 같은걸 만든다. (recipeId로 정보를 가져오는 함수)
    }, [recipeId])
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);    
    }, [])
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{recipeId ? 'Recipe Detail' : 'Recipe Post'}</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="title" 
                        onChange={(e) => setRecipe({...recipe, title: e.target.value })} 
                        value={recipe.title}
                        required 
                    />
                </div>
                <div class="mb-3">
                    <label for="user" class="form-label">User</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="user" 
                        onChange={(e) => setRecipe({...recipe, user: e.target.value })} 
                        value={recipe.user} 
                        required 
                    />
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <textarea 
                        class="form-control" 
                        id="content" 
                        rows="3" 
                        onChange={(e) => setRecipe({...recipe, content: e.target.value })} 
                        value={recipe.content}  
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select" id="category" value={recipe.category} onChange={(e) => setRecipe({...recipe, category: e.target.category })}required>
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
                <div class="mb-3">
                    <label for="date" class="form-label">Date</label>
                    <input type="date" class="form-control" id="date" value={date} readOnly/>
                </div>
                <div class="mb-3">
                    <label for="img" class="form-label">Image</label>
                    <input type="file" class="form-control" id="img" accept="image/*" onChange={handleImageChange} />
                </div>
                <button type="submit" class="btn btn-primary">{recipeId ? "Update Recipe" : "Create Recipe"}</button>
            </form>
        </div>
    );
}