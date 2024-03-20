import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Importar useHistory
import axios from 'axios';
import Recurso1 from "../../img/Recurso1.png";
import Recurso2 from "../../img/Recurso2.png";
import Recurso3 from "../../img/Recurso3.png";
import Recurso4 from "../../img/Recurso4.png";
import Recurso5 from "../../img/Recurso5.png";
import Recurso6 from "../../img/Recurso6.png";
import Recurso8 from "../../img/Recurso8.png";
import Recurso9 from "../../img/Recurso9.png";


const EditProfile = () => {
    const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory
    const { id } = useParams(); // Obtener el ID del perfil de los parámetros de la URL
    const [profile, setProfile] = useState({
        nombre: '',
        pin: '',
        avatar: '',
        edad: 0,
    });

    useEffect(() => {
        // Obtener los detalles del perfil al cargar el componente
        axios.get(`http://localhost:3000/getProfile/${id}`) // Endpoint para obtener un perfil por ID
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleAvatarClick = (avatarUrl) => {
        setProfile({
            ...profile,
            avatar: avatarUrl,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/updateProfile/${id}`, profile); // Endpoint para actualizar un perfil por ID
            alert('Perfil actualizado correctamente.');
            navigate('/adminProfile'); // Redirigir a la lista de perfiles después de la actualización
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el perfil.');
        }
    };

    return (
        <div className="profile-container">
            <h1>Editar Perfil</h1>
            <div className="avatar-container">
                <div className="selected-avatar">
                    <img src={profile.avatar} alt="Avatar seleccionado" className="avatar-select" style={{ maxWidth: '200px' }} />
                </div>
                <div className="avatar-list">
                    <img src={Recurso1} alt="Avatar 1" className="avatar-image" onClick={() => handleAvatarClick(Recurso1)} />
                    <img src={Recurso2} alt="Avatar 2" className="avatar-image" onClick={() => handleAvatarClick(Recurso2)} />
                    <img src={Recurso3} alt="Avatar 3" className="avatar-image" onClick={() => handleAvatarClick(Recurso3)} />
                    <img src={Recurso4} alt="Avatar 4" className="avatar-image" onClick={() => handleAvatarClick(Recurso4)} />
                    <img src={Recurso5} alt="Avatar 5" className="avatar-image" onClick={() => handleAvatarClick(Recurso5)} />
                    <img src={Recurso6} alt="Avatar 6" className="avatar-image" onClick={() => handleAvatarClick(Recurso6)} />
                    <img src={Recurso8} alt="Avatar 7" className="avatar-image" onClick={() => handleAvatarClick(Recurso8)} />
                    <img src={Recurso9} alt="Avatar 8" className="avatar-image" onClick={() => handleAvatarClick(Recurso9)} />

                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" value={profile.nombre} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="pin" className="form-label">PIN:</label>
                    <input type="text" className="form-control" id="pin" name="pin" value={profile.pin} onChange={handleInputChange} required />
                </div>
                <div >
                    <label htmlFor="edad" className="form-label">Edad:</label>
                    <input type="number" className="form-control" id="edad" name="edad" value={profile.edad} onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-secondary">Actualizar Perfil</button>
                <Link to="/adminProfile" className="btn btn-regreso">Regresar</Link>
            </form>
        </div>
    );
};

export default EditProfile;
