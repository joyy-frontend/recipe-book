import { Link } from "react-router-dom";
import "../Custom.css";

export default function Footer({ isLoggedIn }) {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-section">
            <h5 className="footer-title">About Us</h5>
            <p className="footer-text">Welcome to Cookit, created by Joy, Yun, and Mina from Tamwood's React Development Program. We're passionate about bringing people together through the joy of cooking. Our platform aims to make recipe sharing simple, fun and accessible to everyone.
            </p>
          </div>
          <div className="col-md-4 footer-section">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li>
                <Link to="/">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/recipes">
                  <i className="fas fa-utensils"></i> Recipes
                </Link>
              </li>
              {isLoggedIn? (
                <>
                  <li>
                    <Link to="/mypage">
                      <i className="fas fa-sign-in-alt"></i> Mypage
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <i className="fas fa-registered"></i> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="col-md-4 footer-section">
            <h5 className="footer-title">Contact</h5>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-envelope"></i>
                <span>Tamwood@gmail.com</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>+123 456 7890</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Built with React.js | Final Project 2024</p>
        </div>
      </div>
    </footer>
  );
}