import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Perfil = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(sessionStorage.getItem("userId") || ''); // Obtener userId de sessionStorage
    const [user, setUser] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        pais: '',
        fechanacimiento: '',
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/getUserById/${userId}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);
    const formatFechaNacimiento = (fecha) => {
        const date = new Date(fecha);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <div className="registro-container">
            <div className="registro-form">
                <h3>Perfil de Usuario</h3>
                <div>
                    <p>Nombre: {user.nombre}</p>
                    <p>Apellidos: {user.apellidos}</p>
                    <p>Email: {user.email}</p>
                    <p>País: {user.pais}</p>
                    <p>Fecha de Nacimiento: {formatFechaNacimiento(user.fechanacimiento)}</p>
                </div>
                <Link to={`/editUser/${userId}`} className="btn btn-primary">Editar</Link>
            </div>
        </div>
    );
};

export default Perfil;
