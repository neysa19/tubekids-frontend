import React, { useState } from 'react';
import axios from 'axios';

const CreatePlaylist = () => {
  const [nombre, setNombre] = useState('');
  const [url, setUrl] = useState('');
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || '');

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/playlist', { nombre, url, userId }); // Ruta para crear playlists
      console.log(response.data);
      // Mostrar mensaje de éxito o redireccionar a otra página
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div  className='playlists-container'>
      <h1>Crear Playlist</h1>
      <form className ='l-form' onSubmit={handleCreatePlaylist}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre"placeholder="Nombre del Video" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
        <label htmlFor="url">URL:</label>
        <input type="text" id="url"placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required/>
        <button type="submit" className="btn btn-secondary">Crear Playlist</button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
