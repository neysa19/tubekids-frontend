import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

const ListPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const userId = sessionStorage.getItem('userId'); 
  console.log(userId);

  useEffect(() => {
    axios.get(`http://localhost:3000/playlists/${userId}`) // Agregar userId a la URL
      .then(response => {
        setPlaylists(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

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
              src={playlist.url} // Aquí debes colocar la URL del video embebido
              title={playlist.nombre}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
      <Link to="/createPlaylist" className="btn btn-primary">Agregar Nueva Playlist</Link> 
    </div>
  );
};

export default ListPlaylist;
