import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../CrudPlaylist/PlayList.css';

const ListPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

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
  return (
    <div>
      <h2>Lista de Playlists</h2>
      <div className="card-container">
        {playlists.map(playlist => (
          <div key={playlist._id} className="card text-white bg-dark mb-3 d-inline-block">
            <div className="card-body">
              <h5 className="card-header">{playlist.nombre}</h5>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${getVideoIdFromUrl(playlist.url)}?controls=0&modestbranding=1&rel=0&showinfo=0&origin=http://localhost:3000`}
                title={playlist.nombre}
                frameBorder="0"
                allowFullScreen
                className="card-img-top"
                alt="Playlist thumbnail"
              ></iframe>
              <div className="card-footer">
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListPlaylist;
