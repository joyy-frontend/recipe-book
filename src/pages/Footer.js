import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary mt-5 text-white py-4">
      <div className="container">
        <div className="row">
        <div className="col-md-4">
                <h5>About Us</h5>
                <p>Tamwood React Class</p>
            </div>
            <div className="col-md-4">
            <ul className="me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" aria-current="page">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dash" aria-current="page">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <p>Email: Tamwood@gmail.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>© Tamwood Assignment</p>
        </div>
        </div>
    </footer>
  );
}