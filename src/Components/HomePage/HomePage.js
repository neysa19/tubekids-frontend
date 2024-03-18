import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './HomePage.css';


const HomePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [pin, setPin] = useState('');
  const [showPinForm, setShowPinForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getProfilesByUserId/${userId}`)
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  const handlePinConfirmation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/checkPin', { email: sessionStorage.getItem('email'), pin });
      sessionStorage.setItem('userId', response.data.userId);
      navigate('/adminProfile');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handlePinProfileConfirmation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/checkPinProfile ', { nombre: selectedProfile.nombre, pin });
      console.log(selectedProfile.nombre);
      console.log(pin);

      if (response.data.success) {
        navigate('/listPlaylist');
      } else {
        console.log('El PIN es incorrecto');
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };


  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setShowForm(true);
    setShowPinForm(false);
  };

  const handleShowPinForm = () => {
    setShowPinForm(true);
    setShowForm(false);
  };


  return (
    <Container className="home-page-container">
      <h1>Bienvenido</h1>
      <p>¿Quién está viendo ahora?</p>
      <div className="admin-profile-container">
        <h2>Lista de Perfiles</h2>
        <div className="profile-list">
          {profiles.map((profile) => (
            <div key={profile.id} className="profile-item">
              <img
                src={profile.avatar}
                alt="Avatar"
                className="avatar"
                onClick={() => handleProfileSelect(profile)}
                style={{ cursor: 'pointer' }}
              />
              <p>{profile.nombre}</p>
              {showForm && selectedProfile && selectedProfile.nombre === profile.nombre && (
                <form onSubmit={handlePinProfileConfirmation}>
                  <input
                    type="password"
                    placeholder="Ingrese PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                  <button class="btn btn-light" type="submit">Confirmar</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
      {showPinForm &&  (
        <form onSubmit={handlePinConfirmation}>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Ingresa tu PIN"
          />
          <button class="btn btn-light" type="submit">Confirmar PIN</button>
        </form>
      )}
      <Link
        to="#"
        className="btn-perfiles btn btn-primary"
        onClick={handleShowPinForm} 
      >
        Administrar Perfiles
      </Link>
    </Container>
  );
};

export default HomePage;
