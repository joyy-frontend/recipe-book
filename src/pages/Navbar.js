import { Link } from 'react-router-dom';

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/recipes">Recipes</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mypage">My Page</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={onLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
                )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
