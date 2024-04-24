import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePlaylist = () => {
  const [nombre, setNombre] = useState('');
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || '');
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('');

  const handleCreatePlaylist = async (e) => {
    console.log(selectedProfile);
    console.log(userId);
    e.preventDefault();
    try {
      debugger
      const response = await axios.post('http://localhost:3000/playlist', { nombre, userId, profileId: selectedProfile }); // Ruta para crear playlists
      console.log(selectedProfile);
      console.log(userId);
      console.log(response.data);
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

        <label htmlFor="profile">Perfil:</label>
        <select id="profile" value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)} required>
          <option value="">Selecciona un perfil</option>
          {profiles.map(profile => (
            <option key={profile._id} value={profile._id}>{profile.nombre}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-secondary">Crear Playlist</button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
