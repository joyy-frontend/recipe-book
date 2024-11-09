import { Link } from "react-router-dom";
import "../Custom.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-section">
            <h5 className="footer-title">About Us</h5>
            <p className="footer-text">Tamwood React Class</p>
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
                <Link to="/login">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
              </li>
              <li>
                <Link to="/dash">
                  <i className="fas fa-chart-line"></i> Dashboard
                </Link>
              </li>
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
          <p>© {new Date().getFullYear()} Tamwood Assignment</p>
        </div>
      </div>
    </footer>
  );
}