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



  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <Container className="home-page-container">
      <h1>Bienvenido</h1>
      <p>¿Quién está viendo ahora?</p>
      <div className="admin-profile-container">
        <h2>Lista de Perfiles</h2>
        <div className="profile-list">
          {profiles.map((profile) => (
            <Link key={profile.id} to="/listPlaylist" className="profile-item">
              <img src={profile.avatar} alt="Avatar" className="avatar" />
              <p>{profile.nombre}</p>
            </Link>
          ))}
        </div>
      </div>
      {showPinForm && (
        <form onSubmit={handlePinConfirmation}>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Ingresa tu PIN"
          />
          <button type="submit">Confirmar PIN</button>
        </form>
      )}
      <Link
        to="#"
        className="btn-perfiles btn btn-primary"
        onClick={() => setShowPinForm(true)}
      >
        Administrar Perfiles
      </Link>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </Container>
  );
};

export default HomePage;
