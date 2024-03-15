import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap'; // Importa Container y Button de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import './HomePage.css'; // Importa el archivo CSS personalizado

function HomePage() {
  return (
    <Container className="home-page-container">
      <h1>Bienvenido</h1>
      <p>¿Quién está viendo ahora?</p>
      <Link to="/adminProfile" className="btn-perfiles btn btn-primary">Administrar Perfiles</Link>
      <div>
      </div>
    </Container>
  );
}

export default HomePage;