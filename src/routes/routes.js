import {BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage.js";
import NavBar from "../components/NavBar/NavBar.js";
import AboutPage from "../components/About/About.js";
import Login from '../components/Login/Login.js';
import Register from "../components/Register/Register.js";

function routes() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        
        </Routes>
      </BrowserRouter>
    );
  }
export default routes;