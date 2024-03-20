import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './HomePage.css';
import swal from 'sweetalert';


const HomePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [pin, setPin] = useState('');
  const [showPinForm, setShowPinForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);


  const mostrarAlertaSuccess = () => {
    swal({
      title: "El código fue enviado con éxito",
      icon: "success",
      button: "Aceptar"
    });
  }

  const mostrarError = () => {
    swal({
      title: "Sus credenciales son inválidas",
      icon: "warning",
      button: "Aceptar"
    });
  }

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
      mostrarError();
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
        mostrarError();
        console.log('El PIN es incorrecto');
      }
    } catch (error) {
      mostrarError();
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
      <h2>¿Quién está viendo ahora?</h2>
      <h3>Lista de Perfiles</h3>
      <div className="admin-profile-container">
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
                  <button class="btn btn-outline-success" type="submit">Confirmar</button>
                </form>
              )}
            </div>
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
          <button class="btn btn-outline-success" type="submit">Confirmar PIN</button>
        </form>
      )}
      <Link
        to="#"
        className="btn btn-secondary"
        onClick={handleShowPinForm}
      >
        Administrar Perfiles
      </Link>
    </Container>
  );
};

export default HomePage;
