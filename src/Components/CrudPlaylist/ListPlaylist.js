import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../CrudPlaylist/PlayList.css';

const ListPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const { profileId } = useParams(); // Obtener el ID del profile de los parámetros de la URL
 
  console.log("Profile Lista " + profileId);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/playlists/profile/${profileId}`)
      .then(response => {
        setPlaylists(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleVerClick = (playlistId) => {
    navigate(`/listVideo/${playlistId}`);
  };

 
  
  return (
    <div>
      <h2>Lista de Playlists</h2>
     
      <div className="card-container">
        {playlists.map(playlist => (
          <div key={playlist._id} className="card text-black bg-ligh  ">
            <div className="card-body">
              <h5 className="card-header">{playlist.nombre}</h5>
              <button className="btn btn-primary" onClick={() => handleVerClick(playlist._id)}>Ver</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListPlaylist;
