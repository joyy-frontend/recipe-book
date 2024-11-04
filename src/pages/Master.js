import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Master(){
    return(
        <>
            <Navbar />
            <Outlet className="container-fluid"/> 
            <Footer />
        </>
    )
}