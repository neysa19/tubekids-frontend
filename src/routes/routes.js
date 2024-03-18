import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage.js";
import NavBar from "../components/NavBar/NavBar.js";
import AboutPage from "../components/About/About.js";
import Login from '../components/Login/Login.js';

import AdminProfile from "../components/AdminProfile/AdminProfile.js";
import CreateProfile from "../components/CrudProfile/CreateProfile.js";
import DeleteProfile from "../components/CrudProfile/DeleteProfile.js"; // Importa el componente DeleteProfile
import EditProfile from "../components/CrudProfile/EditProfile.js";
import ListProfiles from "../components/CrudProfile/ListProfiles.js";

import CreateUser from "../components/CrudUser/CreateUser.js";
import DeleteUser from "../components/CrudUser/DeleteUser.js";
import EditUser from "../components/CrudUser/EditUser.js";
import ListUsers from "../components/CrudUser/ListUsers.js";

import CreatePlaylist from "../components/CrudPlaylist/CreatePlaylist.js";
import DeletePlaylist from "../components/CrudPlaylist/DeletePlaylist.js";
import EditPlaylist from "../components/CrudPlaylist/EditPlaylist.js";
import ListPlaylist from "../components/CrudPlaylist/ListPlaylist.js";

function routes() {
  return (
    <BrowserRouter>
      <NavBar />
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
        <Route path="/deleteUser" element={<DeleteUser />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/listUsers" element={<ListUsers />} />
        <Route path="/createPlaylist" element={<CreatePlaylist />} />
        <Route path="/deletePlaylist/:id" element={<DeletePlaylist />} />
        <Route path="/editPlaylist/:id" element={<EditPlaylist />} />
        <Route path="/listPlaylist" element={<ListPlaylist />} />
      </Routes>
    </BrowserRouter>
  );
}
export default routes;
