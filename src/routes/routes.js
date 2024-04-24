import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from "../components/HomePage/HomePage.js";
import NavBar from "../components/NavBar/NavBar.js";
import AboutPage from "../components/About/About.js";
import Login from '../components/LoginN/Login.js';

import AdminProfile from "../components/AdminProfile/AdminProfile.js";
import CreateProfile from "../components/CrudProfile/CreateProfile.js";
import DeleteProfile from "../components/CrudProfile/DeleteProfile.js";
import EditProfile from "../components/CrudProfile/EditProfile.js";
import ListProfiles from "../components/CrudProfile/ListProfiles.js";

import CreateUser from "../components/CrudUser/CreateUser.js";
import EditUser from "../components/CrudUser/EditUser.js";
import ListUsers from "../components/CrudUser/Perfil.js";

import CreatePlaylist from "../components/CrudPlaylist/CreatePlaylist.js";
import DeletePlaylist from "../components/CrudPlaylist/DeletePlaylist.js";
import EditPlaylist from "../components/CrudPlaylist/EditPlaylist.js";
import ListPlaylist from "../components/CrudPlaylist/ListPlaylist.js";
import AdministrarPlaylist from "../components/CrudPlaylist/AdministrarPlaylist.js";

import CreateVideo from "../components/CrudVideo/CreateVideo.js";
import DeleteVideo from "../components/CrudVideo/DeleteVideo.js";
import EditVideo from "../components/CrudVideo/EditVideo.js";
import ListVideo from "../components/CrudVideo/ListVideo.js";
import AdministrarVideo from "../components/CrudVideo/AdministrarVideo.js";


function routes() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>
      {isLoggedIn && <NavBar />} 
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/adminProfile" element={<AdminProfile />} />
        <Route path="/createProfile" element={<CreateProfile />} />
        <Route path="/deleteProfile/:id" element={<DeleteProfile />} /> 
        <Route path="/editProfile/:id" element={<EditProfile />} /> 
        <Route path="/listProfiles" element={<ListProfiles />} />

        <Route path="/createUser" element={<CreateUser />} />
   
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route path="/listUsers" element={<ListUsers />} />

        <Route path="/AdministrarPlaylist" element={<AdministrarPlaylist />} />
        <Route path="/createPlaylist" element={<CreatePlaylist />} />
        <Route path="/deletePlaylist/:id" element={<DeletePlaylist />} />
        <Route path="/editPlaylist/:id" element={<EditPlaylist />} />
        <Route path="/listPlaylist" element={<ListPlaylist />} />


        <Route path="/AdministrarVideo" element={<AdministrarVideo />} />
        <Route path="/createVideo/:id" element={<CreateVideo/>} />
        <Route path="/deleteVideo/:id" element={<DeleteVideo />} />
        <Route path="/editVideo/:id" element={<EditVideo />} />
        <Route path="/listVideo" element={<ListVideo />} />


      </Routes>
      
  /</BrowserRouter>
  );
}

export default routes;
