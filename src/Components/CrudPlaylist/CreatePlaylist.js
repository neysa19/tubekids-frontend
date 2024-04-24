import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreatePlaylist = () => {
  const [nombre, setNombre] = useState('');
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || '');
  const [profiles, setProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState('');

  const navigate = useNavigate();

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      debugger
      const response = await axios.post('http://localhost:3000/playlist', { nombre, userId, profileIds: selectedProfiles }); // Cambiar profileId a profileIds
      console.log(response.data);
      navigate('/AdministrarPlaylist');
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/getProfilesByUserId/${userId}`)
      .then((response) => {
        console.log(response.data);
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);


  return (
    <div className='playlists-container'>
      <h1>Crear Playlist</h1>
      <form className='l-form' onSubmit={handleCreatePlaylist}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" placeholder="Nombre del Video" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Perfiles:</label>
        {profiles.map(profile => (
          <div key={profile._id}>
            <input
              type="checkbox"
              id={profile._id}
              value={profile._id}
              checked={selectedProfiles.includes(profile._id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedProfiles([...selectedProfiles, e.target.value]);
                } else {
                  setSelectedProfiles(selectedProfiles.filter(id => id !== e.target.value));
                }
              }}
            />
            <label htmlFor={profile._id}>{profile.nombre}</label>
          </div>
        ))}


        <button type="submit" className="btn btn-secondary">Crear Playlist</button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
