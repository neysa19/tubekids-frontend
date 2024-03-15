import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminProfile.css'; // Importa los estilos CSS personalizados

function AdminProfile() {
    // Estado para almacenar la lista de perfiles
    const [profiles, setProfiles] = useState([
      { id: 1, name: 'Perfil 1', email: 'perfil1@example.com' },
      { id: 2, name: 'Perfil 2', email: 'perfil2@example.com' },
      { id: 3, name: 'Perfil 3', email: 'perfil3@example.com' },
    ]);
  
    // Función para eliminar un perfil por su ID
    const deleteProfile = (id) => {
      setProfiles(profiles.filter((profile) => profile.id !== id));
    };
  
    return (
      <div className="admin-profile-container">
        <h2>Lista de Perfiles</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.id}</td>
                <td>{profile.name}</td>
                <td>{profile.email}</td>
                <td>
                  <Button variant="info" size="sm">Editar</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => deleteProfile(profile.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
  
  export default AdminProfile;
  