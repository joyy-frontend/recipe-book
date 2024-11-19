import { NavLink  } from "react-router-dom";
import "../Custom.css";
import logo from "../assets/images/logo.png";
import { useEffect, useState } from "react";

export default function Navbar({ isLoggedIn, onLogout }) {
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if(user) {
      console.log(user);
      setCurrentUser(user.email);
      console.log(currentUser);
    }
  }, [])
    return (
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="container">
          <div className="navbar-header">
            <NavLink className="navbar-brand" to="/">
              <img src={logo} alt="logo" className="nav-logo" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
  
          <div className="collapse navbar-collapse" id="navbarNav">
            {isLoggedIn && (
              <div
                className="nav-link"
                style={{ whiteSpace: "nowrap", paddingTop: "20px" }}
              >
                <p style={{ color: "#C86322" }}>{currentUser}, logged in!</p>
              </div>
            )}
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/recipes"
                  activeClassName="active"
                >
                  Recipes
                </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/mypage"
                      activeClassName="active"
                    >
                      MyPage
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={onLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/login"
                      activeClassName="active"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/register"
                      activeClassName="active"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
}