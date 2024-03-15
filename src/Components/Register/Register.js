import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Register.css";
import sweet from 'sweetalert';

const sucess = () => {
    sweet({
        title: "El correo fue enviado con éxito",
        text: "",
        icon: "success",
        buttons: "Aceptar"
    });
}

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [password, setPassword] = useState('');
    const [pais, setPais] = useState('');
    const [fechanacimiento, setFechaNacimiento] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
       
        try {
            const response = await axios.post('http://localhost:3000/register', { nombre, apellido, email, pin, password, pais, fechanacimiento})
            sucess();
            navigate("/");
        } catch (error) {
            console.error(error.response.date);
        }
    };

    return (
        <div className="register-container">
        <h2>Registro</h2>
        <form className="register-form" onSubmit={handleRegister}>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
            <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="text" placeholder="País" value={pais} onChange={(e) => setPais(e.target.value)} required />
            <input type="date" placeholder="Fecha de nacimiento" value={fechanacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
            <button type="submit">Registrarse</button>
            <br></br>
            <Link to="/">Ya tengo una cuenta</Link>
        </form>
    </div>
);
};

export default Register;