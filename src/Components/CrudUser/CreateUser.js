import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import './User.css';

const CreateUser = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pais, setPais] = useState('');
  const [fechanacimiento, setFechaNacimiento] = useState('');
  const navigate = useNavigate();

  const mostrarAlertaSuccess = () => {
    swal({
      title: "El código fue enviado con éxito",
      icon: "success",
      button: "Aceptar"
    });
  };

  const mostrarError = (message) => {
    swal({
      title: "Error",
      text: message,
      icon: "warning",
      button: "Aceptar"
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const hoy = new Date();
    const fechaNacimiento = new Date(fechanacimiento);
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 18) {
      mostrarError("Deber ser mayor de 18 años")
      return;
    }

    if (password !== confirmPassword) {
      mostrarError("Las contraseñas no coinciden.");
      return;
    }

    if (pin.length !== 6) {
      mostrarError("El PIN debe tener exactamente 6 dígitos.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', { nombre, apellido, email, pin, password, pais, fechanacimiento });
      console.log(response.data);
      mostrarAlertaSuccess();
      navigate("/");
    } catch (error) {
      mostrarError("Sus credenciales son inválidas.");
      console.error(error.response.data);
    }
  };

  return (
    <div className="registro-container">
      <div className="regitro-form">
        <h3>Regístrate</h3>
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formApellido">
            <Form.Label>Apellido:</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formPin">
            <Form.Label>PIN:</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu PIN (6 digitos)" value={pin} onChange={(e) => setPin(e.target.value)} pattern="\d{6}" required />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirmar Contraseña:</Form.Label>
            <Form.Control type="password" placeholder="Confirma tu contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formPais">
            <Form.Label>País:</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu país" value={pais} onChange={(e) => setPais(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formFechaNacimiento">
            <Form.Label>Fecha de Nacimiento:</Form.Label>
            <Form.Control type="date" value={fechanacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
          </Form.Group>

          <Button variant="primary" type="submit" className="btnSubmit">Crear Usuario</Button>
        </Form>
        <Link to="/" className="btn-regresar">Ya tengo un usuario</Link>
      </div>
    </div>
  );
};

export default CreateUser;
