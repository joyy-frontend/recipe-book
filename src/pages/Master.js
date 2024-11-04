import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Master({ isLoggedIn, onLogout }) {
    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
            <Outlet className="container-fluid" />
            <Footer />
        </>
    );
}