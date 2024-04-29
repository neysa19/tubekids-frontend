import React, { useState, useEffect } from 'react';
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
    const fetchData = async () => {
      if (!userId) return; // Si userId es null, no ejecutar la consulta
      const body = `
        query {
          GetAll(userId: "${userId}") {
            _id
            nombre
            avatar
            edad
            userId
          }
        }
      `;
      try {
        const response = await axios.post('http://localhost:3002/graphql', { query: body }
        , {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        });

        if (response.data && response.data.data && response.data.data.GetAll) {
          setProfiles(response.data.data.GetAll); // Guardar los resultados en el estado
        } else {
          setProfiles([]); // Si no hay resultados, establecer el estado en un arreglo vacío
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
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
    <h1>Lista de Perfiles</h1>
    <div className="create-profile-btn">
      <Link to="/createProfile" className="btn btn-secondary">Crear Perfil Nuevo</Link>
    </div>
    <div className="card-container">  
      <div className="profile-list">
        {profiles.map((profile) => (
          <div key={profile._id} className="profile-item">
            <img src={profile.avatar} alt="Avatar" className="avatar" />
            <p>Nombre: {profile.nombre}</p>
            <p>Edad: {profile.edad}</p>
            <div className="action-buttons">
              <Link to={`/editProfile/${profile._id}`} className="btn btn-outline-success">Editar</Link>
              <button type="button" className="btn btn-outline-danger" onClick={() => deleteProfile(profile._id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
export default AdminProfile;
