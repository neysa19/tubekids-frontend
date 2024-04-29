import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListVideo = () => {
  const { id } = useParams(); // Obtener el ID de la playlist de los parámetros de la URL
  const [videos, setVideos] = useState([]);
  const playlistId = id;
  const navigate = useNavigate();
  console.log("playlistId in EditPlaylist:", playlistId); // Verifica si playlistId está definido aquí

  useEffect(() => {
    // Función para obtener los videos por ID de la playlist
    const obtenerVideosPorPlaylistId = async () => {
      console.log(id)
      try {
        const response = await axios.get(`http://localhost:3000/videos/playlist/${id}`);
        setVideos(response.data);

      } catch (error) {
        console.error('Error al obtener los videos de la playlist:', error);
      }
    };

    obtenerVideosPorPlaylistId(id); // Llamar a la función para obtener los videos al cargar el componente
  }, [id]);

  const getVideoIdFromUrl = (url) => {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition);
    } else {
      return videoId;
    }
  };
  const handleSearchClick = () => {
    console.log (playlistId);
    navigate(`/searchVideo/${playlistId}`);
  };
  
  return (
    <div className="container mt-4">
      <h1>Lista de Videos</h1>
      <div>
        <button className="btn btn-primary" onClick={handleSearchClick}>Buscar Videos</button>
      </div>

      <Link to={`/createVideo/${id}`} className="btn btn-secondary">Agregar Video</Link>
      <div className="card-container">
        {videos.map((video) => (
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

export default ListVideo;
