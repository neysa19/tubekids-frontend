import React, { useState } from 'react'; 
import axios from 'axios'; 
import './Login.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import swal from 'sweetalert'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("email", email);
      navigate('/home');
    } catch (error) {
      mostrarError(); 
      console.error(error.response.data);
    }
  };

  return (
    <Container className="login-container">
    <h2 className="text-center mb-4">Login</h2>
    <Form className="login-form" onSubmit={handleLogin}>
      <Form.Group controlId="formEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" placeholder="Ingrese su correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit" className="btn-start">Iniciar sesión</Button>
      <Link to="/createUser" className="btn-register">Registrarse</Link>
    </Form>
  </Container>
);
};

export default Login;
