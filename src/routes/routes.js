import {BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage.js";
import NavBar from "../components/NavBar/NavBar.js";
import AboutPage from "../components/About/About.js"

function routes() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        
        </Routes>
      </BrowserRouter>
    );
  }
export default routes;