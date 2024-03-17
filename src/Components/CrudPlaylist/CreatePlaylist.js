import React, { useState } from 'react';
import axios from 'axios';

const CreatePlaylist = () => {
  const [nombre, setNombre] = useState('');
  const [url, setUrl] = useState('');
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || '');

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/playlist', { nombre, url,userId }); // Ruta para crear playlists
      console.log(response.data);
      // Mostrar mensaje de éxito o redireccionar a otra página
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div>
      <h2>Crear Playlist</h2>
      <form onSubmit={handleCreatePlaylist}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <label htmlFor="url">URL:</label>
        <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button type="submit">Crear Playlist</button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
