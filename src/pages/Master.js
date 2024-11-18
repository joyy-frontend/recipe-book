import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Master({ isLoggedIn, user, onLogout }) {
    const navigate = useNavigate();

    //handleLogout was in App.js but moved here for navigate to home page after logout
    const handleLogout = () => {
        onLogout(); 
        navigate("/"); 
    };

    return (
        <div className="master-container">
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer isLoggedIn={isLoggedIn} />
        </div>
    );
}
