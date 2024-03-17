import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./User.css";
import swal from 'sweetalert'; 


const CreateUser = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [pais, setPais] = useState('');
  const [fechanacimiento, setFechaNacimiento] = useState('');
  const [role, setRole] = useState('user');
  const [estado, setEstado] = useState('');
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', { nombre, apellido, email, pin, password, pais, fechanacimiento, role, estado });
      console.log(response.data);
      mostrarAlertaSuccess();
      navigate("/");
    } catch (error) {
      mostrarError(); 
      console.error(error.response.data);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registrate</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido:</label>
          <input type="text" className="form-control" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="pin" className="form-label">PIN:</label>
          <input type="text" className="form-control" id="pin" value={pin} onChange={(e) => setPin(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="pais" className="form-label">País:</label>
          <input type="text" className="form-control" id="pais" value={pais} onChange={(e) => setPais(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="fechanacimiento" className="form-label">Fecha de Nacimiento:</label>
          <input type="date" className="form-control" id="fechanacimiento" value={fechanacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Crear Usuario</button>
      </form>
      <Link to="/" className="link-underline-primary">Ya tengo un usuario</Link>
    </div>
  );
};

export default CreateUser;