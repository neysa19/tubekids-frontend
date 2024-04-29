import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../CrudPlaylist/PlayList.css';

const SearchVideos = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { playlistId } = useParams(); // Obtener el ID del perfil de los parámetros de la URL



  const navigate = useNavigate();

  const handleSearch = async (playlistId, e) => {
    e.preventDefault();
    console.log("playlistId enviado:", playlistId);
    const body = `
    query {
      SearchVideos(playlistId: "${playlistId}", searchText: "${searchText}") {
        _id
        nombre
        descripcion
        url
        idPlaylist
      }
    }
  `;
    try {
      const response = await axios.post('http://localhost:3002/graphql', { query: body }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });

      const responseData = response.data.data;
      if (responseData && responseData.SearchVideos) {
        setSearchResults(responseData.SearchVideos);

      } else {
        setSearchResults([]);
        console.log("No encuentra ni mierda");
      }
    } catch (error) {
      console.error('Error:', error);
      setSearchResults([]);
    }
  };
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
      <h2>Buscar Videos</h2>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar videos..."
        />
        <button onClick={(e) => handleSearch(playlistId, e)}>Buscar</button>
      </div>

      <div className="card-container">
        {searchResults.map((video) => (
          <div key={video._id} className="card text-black bg-ligh ">
            <div className="card-body">
              <h3 className="card-header">{video.nombre}</h3>
              {/* Mostrar el reproductor de video con el ID obtenido de la URL */}
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${getVideoIdFromUrl(video.url)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchVideos;
