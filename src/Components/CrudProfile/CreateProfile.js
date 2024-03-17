import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // HTTP
import swal from 'sweetalert';
import "../CrudProfile/Profile.css";

import Recurso1 from "../../img/Recurso1.png";
import Recurso2 from "../../img/Recurso2.png";
import Recurso3 from "../../img/Recurso3.png";
import Recurso4 from "../../img/Recurso4.png";
import Recurso5 from "../../img/Recurso5.png";
import Recurso6 from "../../img/Recurso6.png";
import Recurso8 from "../../img/Recurso8.png";
import Recurso9 from "../../img/Recurso9.png";

const CreateProfile = () => {
    const [nombre, setNombre] = useState('');
    const [pin, setPin] = useState('');
    const [avatar, setAvatar] = useState(Recurso1); // Avatar inicial
    const [userId, setUserId] = useState(sessionStorage.getItem("userId") || ''); // Obtener userId de sessionStorage
    const [edad, setEdad] = useState('');
    const navigate = useNavigate();

    const mostrarAlertaSuccess = () => {
        swal({
            title: "El perfil se ha creado con éxito",
            icon: "success",
            button: "Aceptar"
        });
    }

    const mostrarError = () => {
        swal({
            title: "Error al crear el perfil",
            text: "Por favor, verifica los datos e intenta nuevamente.",
            icon: "error",
            button: "Aceptar"
        });
    }

    const handleAvatarClick = (avatarUrl) => {
        setAvatar(avatarUrl); // Actualizar el avatar seleccionado
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/registerProfile', { nombre, pin, edad, avatar, userId }); // Enviar avatar al backend
            console.log(response.data);
            mostrarAlertaSuccess();
            navigate("/adminProfile");
        } catch (error) {
            mostrarError();
            console.error(error.response.data);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Crear Perfil</h2>
            <div className="avatar-container">
                <div className="selected-avatar">
                    <img src={avatar} alt="Avatar seleccionado" className="img-thumbnail" style={{ maxWidth: '200px' }} />
                </div>
                <div className="avatar-list">
                    <img src={Recurso1} alt="Avatar 1" className="avatar-image" onClick={() => handleAvatarClick(Recurso1)} />
                    <img src={Recurso2} alt="Avatar 2" className="avatar-image" onClick={() => handleAvatarClick(Recurso2)} />
                    <img src={Recurso3} alt="Avatar 3" className="avatar-image" onClick={() => handleAvatarClick(Recurso3)} />
                    <img src={Recurso8} alt="Avatar 8" className="avatar-image" onClick={() => handleAvatarClick(Recurso8)} />
                    <img src={Recurso6} alt="Avatar 6" className="avatar-image" onClick={() => handleAvatarClick(Recurso6)} />
                    <img src={Recurso5} alt="Avatar 5" className="avatar-image" onClick={() => handleAvatarClick(Recurso5)} />
                    <img src={Recurso9} alt="Avatar 9" className="avatar-image" onClick={() => handleAvatarClick(Recurso9)} />
                    <img src={Recurso4} alt="Avatar 4" className="avatar-image" onClick={() => handleAvatarClick(Recurso4)} />
                </div>
            </div>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pin" className="form-label">PIN:</label>
                    <input type="text" className="form-control" id="pin" value={pin} onChange={(e) => setPin(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="edad" className="form-label">Edad:</label>
                    <input type="number" className="form-control" id="edad" value={edad} onChange={(e) => setEdad(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Crear Perfil</button>
            </form>
            <Link to="/adminProfile" className="link-underline-primary mt-3">Ya tengo un perfil</Link>
        </div>
    );
};

export default CreateProfile;
