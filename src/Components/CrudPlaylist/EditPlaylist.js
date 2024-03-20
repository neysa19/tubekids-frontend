import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams y useNavigate
import axios from 'axios';

const EditPlaylist = () => {
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory
  const { id } = useParams(); // Obtener el ID de la playlist de los parámetros de la URL
  const [playlist, setPlaylist] = useState({
    nombre: '',
    url: '',
    userId: sessionStorage.getItem('userId') || '',
  });

  useEffect(() => {
    // Obtener los detalles de la playlist al cargar el componente
    axios.get(`http://localhost:3000/playlist/${id}`) // Endpoint para obtener una playlist por ID
      .then((response) => {
        setPlaylist(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaylist({
      ...playlist,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/playlist/${id}`, playlist); // Endpoint para actualizar una playlist por ID
      alert('Playlist actualizada correctamente.');
      navigate('/listPlaylist'); // Redirigir a la lista de playlists después de la actualización
    } catch (error) {
      console.error(error);
      alert('Error al actualizar la playlist.');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Editar Playlist</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={playlist.nombre} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">URL:</label>
          <input type="text" className="form-control" id="url" name="url" value={playlist.url} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Playlist</button>
      </form>
    </div>
  );
};

export default EditPlaylist;
