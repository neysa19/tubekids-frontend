import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EditUser = () => {
    const navigate = useNavigate();
    const { id } = useParams(sessionStorage.getItem('userId'));
    const [user, setUser] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        pais: '',
        fechanacimiento: '',
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/getUserById/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/updateUserById/${id}`, user);
            alert('Perfil actualizado correctamente.');
            navigate('/adminProfile');
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el perfil.');
        }
    };

    return (
        <div className="registro-container">
            <div className="registro-form">
                <h3>Editar Usuario</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control type="text" placeholder="Ingresa tu nombre" value={user.nombre} onChange={handleInputChange} name="nombre" />
                    </Form.Group>

                    <Form.Group controlId="formApellidos">
                        <Form.Label>Apellidos:</Form.Label>
                        <Form.Control type="text" placeholder="Ingresa tus apellidos" value={user.apellidos} onChange={handleInputChange} name="apellidos" />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Ingresa tu email" value={user.email} onChange={handleInputChange} name="email" />
                    </Form.Group>

                    <Form.Group controlId="formPais">
                        <Form.Label>País:</Form.Label>
                        <Form.Control type="text" placeholder="Ingresa tu país" value={user.pais} onChange={handleInputChange} name="pais" />
                    </Form.Group>

                    <Form.Group controlId="formFechaNacimiento">
                        <Form.Label>Fecha de Nacimiento:</Form.Label>
                        <Form.Control type="date" value={user.fechanacimiento} onChange={handleInputChange} name="fechanacimiento" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="btnSubmit">Editar</Button>
                </Form>
            </div>
        </div>
    );
};

export default EditUser;
