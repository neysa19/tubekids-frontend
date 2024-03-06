import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/Login.js";
import HomePage from "../HomePage/HomePage.js";
import Navbar from "../NavBar/NavBar.js";
import Logout from "../Logout/Logout.js";

function AllRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/navBar" element={<Navbar />} />
            <Route path="/Logout" element={<Logout/>} />
        </Routes>
        </BrowserRouter>
    );
}
export default AllRoutes;