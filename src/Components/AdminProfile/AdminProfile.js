import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminProfile.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminProfile.css';

const AdminProfile = () => {
  const [profiles, setProfiles] = useState([]);

  const userId = sessionStorage.getItem('userId'); 
  console.log(userId);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getProfilesByUserId/${userId}`) // Agregar userId a la URL
      .then((response) => {
        console.log(response.data);
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);
  

  const deleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteProfile/${id}`); 
      setProfiles(prevProfiles => prevProfiles.filter(profile => profile._id !== id)); // Actualizar el estado local
      alert('Perfil eliminado correctamente.');
      navigate("/adminProfile");
    } catch (error) {
      console.error(error);
      alert('Error al eliminar el perfil.');
    }
  };

  return (
    <div className="admin-profile-container">
      <h2>Lista de Perfiles</h2>
      <Link to="/createProfile" className="btn btn-primary">Crear Perfil Nuevo</Link>
      <div className="profile-list">
        {profiles.map((profile) => (
          <div key={profile._id} className="profile-item">
            <img src={profile.avatar} alt="Avatar" className="avatar" />
            <p>Nombre: {profile.nombre}</p>
            <p>Edad: {profile.edad}</p>
            <div className="action-buttons">
            <Link to={`/editProfile/${profile._id}`} className="btn btn-info">Editar</Link> {/* Redirige a la página de edición y pasa el ID del perfil */}
              <button className="btn btn-danger" onClick={() => deleteProfile(profile._id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}
export default AdminProfile;
