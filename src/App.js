import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Master from "./pages/Master";
import Mypage from "./pages/Mypage";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import RecipePost from "./pages/RecipePost";
import Nopage from "./pages/Nopage";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = JSON.parse(localStorage.getItem("loggedIn"));
    setIsLoggedIn(loggedInStatus || false);
  }, []);

  const handleLogin = (userInfo) => {
    setIsLoggedIn(true);
    localStorage.setItem("loggedIn", JSON.stringify(true));
    localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Store user info if needed
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userInfo");
  };

  return(
    <BrowserRouter>
      <Master isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login onLogin={handleLogin} />} />
        <Route path="register" element={<Register />} />
        <Route path="mypage" element={isLoggedIn ? <Mypage /> : <Login onLogin={handleLogin} />} />
        <Route path="recipes" element={<RecipeList />}>
          <Route path=":id" element={<RecipeDetail />} />
          <Route path="new" element={<RecipePost />} />
        </Route>
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  )
}