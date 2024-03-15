import React, { useState } from 'react'; 
import axios from 'axios'; 
import './Login.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import swal from 'sweetalert'; 

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
      // Almacena los datos de usuario en la sesión de almacenamiento local
      sessionStorage.setItem("validacion", response.data.validacion);
      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("nombre", response.data.name);
      mostrarAlertaSuccess();
      navigate('/home'); // Cambia '/home' a la ruta deseada después del inicio de sesión exitoso
    } catch (error) {
      mostrarError(); 
      console.error(error.response.data);
    }
  };

  return (
    <div className='all'>
      <h2 className='title'>Login</h2>
      <form className='form' onSubmit={handleLogin}>
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className='btn-start'>Iniciar sesión</button>
        <Link to="/register" className='btn-register'> Registrarse</Link> 
      </form>
    </div>
  );
};

export default Login;
