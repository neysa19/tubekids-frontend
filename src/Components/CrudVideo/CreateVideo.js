import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate   } from 'react-router-dom';


const CreateVideo = () => {
  const [nombre, setNombre] = useState('');
  const [url, setUrl] = useState('');
  //const [playlistId, setPlaylistId] = useState('');
  const [descripcion, setDescripcion] = useState(''); // Estado para la descripción del video

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      debugger
      console.log(id)
      const response = await axios.post('http://localhost:3000/video', { nombre, url, descripcion ,playlistId: id });
      console.log(response.data);
      navigate(`/editPlaylist/${id}`);
    } catch (error) {
      console.error('Error al crear el video:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="container mt-4">
      <h1>Crear Nuevo Video</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre del Video</label>
          <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">URL del Video</label>
          <input type="text" className="form-control" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción del Video</label>
          <textarea className="form-control" id="descripcion" rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Crear Video</button>
      </form>
    </div>
  );
};
export default CreateVideo;
