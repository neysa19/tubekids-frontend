import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import 'jquery/dist/jquery.min.js'; // Importa jQuery
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa los scripts de Bootstrap
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const phoneNumber = sessionStorage.getItem("phone");

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

  const sendCode = async () => {
    try {
      await axios.post('http://localhost:3000/sendVerificationCode', { phoneNumber });
      mostrarAlertaSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      sessionStorage.setItem("validacion", response.data.validacion);
      sessionStorage.setItem("phone", response.data.phone);

      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("nombre", response.data.nombre);
      sessionStorage.setItem("isLoggedIn", "true");
      if (sessionStorage.getItem("validacion") === "Activa") {
        sendCode(e);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("name", response.data.name);
        navigate("/validarSMS");
      } else if (sessionStorage.getItem("validacion") !== "Desactiva") {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("name", response.data.name);
        navigate("/home");
      }
    } catch (error) {
      mostrarError();
      console.error(error.response.data);
    }
  };

  return (
    <Container className="login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingresar</h3>
          <Form className="login-form" onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
              <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="btnSubmit">Iniciar sesión</Button>
            <Link to="/createUser" className="btn-register">Registrarse</Link>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
