import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'; // Importa useHistory

const ListPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const history = useHistory(); // Obtiene la instancia de useHistory

  useEffect(() => {
    axios.get(`http://localhost:3000/playlists/${userId}`)
      .then(response => {
        setPlaylists(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const getVideoIdFromUrl = (url) => {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition);
    } else {
      return videoId;
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`http://localhost:3000/playlists/${playlistId}`);
      setPlaylists(playlists.filter(playlist => playlist._id !== playlistId));
    } catch (error) {
      console.error('Error al eliminar la playlist:', error);
    }
  };

  // Función para redirigir a la página de edición de playlist con el ID
  const handleEditPlaylist = (playlistId) => {
    history.push(`/editPlaylist/${playlistId}`);
  };

  return (
    <div>
      <h2>Lista de Playlists</h2>
      <div className="playlist-container">
        {playlists.map(playlist => (
          <div key={playlist._id} className="playlist-item">
            <h3>{playlist.nombre}</h3>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${getVideoIdFromUrl(playlist.url)}?controls=0&modestbranding=1&rel=0&showinfo=0&origin=http://localhost:3000`}
              title={playlist.nombre}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <button onClick={() => handleDeletePlaylist(playlist._id)} className="btn btn-danger">Eliminar</button>
            {/* Usar la función handleEditPlaylist para redirigir al editar */}
            <button onClick={() => handleEditPlaylist(playlist._id)} className="btn btn-primary">Editar</button>
          </div>
        ))}
      </div>
      <Link to="/createPlaylist" className="btn btn-primary">Agregar Nueva Playlist</Link>
    </div>
  );
};

export default ListPlaylist;
