import {BrowserRouter, Routes, Route} from "react-router-dom";
import Master from "./pages/Master";
import Mypage from "./pages/Mypage";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import RecipePost from "./pages/RecipePost";
import Nopage from "./pages/Nopage";


export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Master />}>
        <Route index element={<Home />}/>
        <Route path="mypage" element={<Mypage />} /> 
        <Route path="recipes" element={<RecipeList />}>  
          <Route path=":id" element={<RecipeDetail />} />  
          <Route path="new" element={<RecipePost />} /> 
        </Route>
        <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}