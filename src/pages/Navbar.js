import { Link } from "react-router-dom";
import "../Custom.css";
import logo from "../assets/images/logo.png";
import { useEffect, useState } from "react";

export default function Navbar({ isLoggedIn, onLogout }) {
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      setCurrentUser(user.email);
    }
  }, [])
  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="container">
      <div className="navbar-header">  {/* logo and hamburger */}
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" className="nav-logo" />
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* nav menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
            {
              isLoggedIn &&
              <div className="nav-link" style={{ whiteSpace: 'nowrap', paddingTop: '20px'}}>
                <p style={{ color: '#C86322' }}>{currentUser}, logged in!</p>
              </div>
            }
          <ul className="navbar-nav ms-auto align-items-center">  {/* ms-auto로 오른쪽 정렬 */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipes">
                Recipes
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/mypage">
                    MyPage
                  </Link>
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
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}