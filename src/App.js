import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Master from "./pages/Master";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeList from "./pages/RecipeList";
import Mypage from "./pages/Mypage";
import RecipePost from "./pages/RecipePost";

export default function App() {
  const initialUserState = {
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(initialUserState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loggedInStatus = JSON.parse(localStorage.getItem("loggedIn"));
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedUser =
      JSON.parse(localStorage.getItem("user")) || initialUserState;

    setIsLoggedIn(loggedInStatus || false);
    setUsers(storedUsers);
    setUser(storedUser);
  }, []);

  const handleLogin = (loginUser) => {
    setIsLoggedIn(true);
    setUser(loginUser); // Set the logged-in user's data
    localStorage.setItem("loggedIn", JSON.stringify(true));
    localStorage.setItem("user", JSON.stringify(loginUser)); // Store only the logged-in user in local storage
    alert("Login successfully!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(initialUserState); // Reset user state on logout
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
  };

  const userChange = (key, newVal) => {
    setUser((prevObj) => ({ ...prevObj, [key]: newVal }));
  };

  const addUser = (newUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Store updated array in local storage
      return updatedUsers;
    });
    alert("User registered successfully!");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Master
              isLoggedIn={isLoggedIn}
              user={user}
              onLogout={handleLogout}
            />
          }
        >
          <Route index element={<Home />} />
          <Route
            path="login"
            element={
              <Login
                user={user}
                userChange={userChange}
                handleLogin={handleLogin}
              />
            }
          />
          <Route
            path="register"
            element={
              <Register user={user} userChange={userChange} addUser={addUser} />
            }
          />
          <Route
            path="mypage"
            element={
              isLoggedIn ? (
                <Mypage user={user} userChange={userChange}/>
              ) : (
                <Login handleLogin={handleLogin} />
              )
            }
          />
          <Route path="recipes" element={<RecipeList />} />
          <Route path="recipes/:recipeId" element={<RecipePost />} />
          <Route path="recipes/new" element={<RecipePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
