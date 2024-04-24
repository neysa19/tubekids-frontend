import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Cambia a useHistory
import axios from 'axios';

const EditVideo = () => {
  const navigate = useNavigate();
  const { id , playlistId } = useParams();

  console.log("playlistId in EditVideo:", playlistId); // Verifica si playlistId está definido aquí
  
  const [video, setVideo] = useState({
    nombre: '',
    url: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/video/${id}`)
      .then((response) => {
        setVideo(response.data); // Actualiza la estructura de los datos recibidos
      
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideo({
      ...video,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/video/${id}`, video);
      alert('Video actualizado correctamente.');
      console.log("EditdVideo"+ playlistId)
      navigate(`/editPlaylist/${playlistId}`);
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el video.');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Editar Video</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={video.nombre} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">URL:</label>
          <input type="text" className="form-control" id="url" name="url" value={video.url} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Video</button>
      </form>
    </div>
  );
};

export default EditVideo;
