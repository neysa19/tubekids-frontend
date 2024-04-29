import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ListPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      debugger
      if (!userId) return; // Si userId es null, no ejecutar la consulta
      const body = `
     query {
        PlaylistsPorUsuario(userId: "${userId}") {
        _id
        nombre
        userId
      }
    }
    `;
      try {
        const response = await axios.post('http://localhost:3002/graphql', { query: body }, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        });


        setPlaylists(response.data.data.PlaylistsPorUsuario); // Guardar los resultados en el estado
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId]);

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`http://localhost:3000/playlist/${playlistId}`);
      setPlaylists(playlists.filter(playlist => playlist._id !== playlistId));
    } catch (error) {
      console.error('Error al eliminar la playlist:', error);
    }
  };

  const handleEditPlaylist = (playlistId) => {
    navigate(`/editPlaylist/${playlistId}`);
  };

  return (
    <div className='playlists-container'>
      <h1>Lista de Playlists</h1>
      <Link to="/createPlaylist" className="btn btn-secondary">Crear Playlist</Link>

      <div className="card-container">
        {playlists.map(playlist => (
          <div key={playlist._id} className="card text-black bg-ligh  ">
            <div className="card-body">
              <h5 className="card-header">{playlist.nombre}</h5>
              <div className="card-footer">
                <button type="button" className="btn btn-outline-danger" onClick={() => handleDeletePlaylist(playlist._id)}>Eliminar</button>
                <button type="button" className="btn btn-outline-success" onClick={() => handleEditPlaylist(playlist._id)}>Configurar</button>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default ListPlaylist;
