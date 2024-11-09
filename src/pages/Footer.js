import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer class="bg-primary mt-5 text-white py-4">
      <div class="container">
        <div class="row">
        <div class="col-md-4">
                <h5>About Us</h5>
                <p>Tamwood React Class</p>
            </div>
            <div class="col-md-4">
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
          <div class="col-md-4">
            <h5>Contact</h5>
            <p>Email: Tamwood@gmail.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
        <div class="text-center mt-3">
          <p>© Tamwood Assignment</p>
        </div>
        </div>
    </footer>
  );
}