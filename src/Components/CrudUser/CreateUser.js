import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';


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

    const handleRegister = async (e) => {
        e.preventDefault();
        

        try {
            
          const response = await axios.post('http://localhost:3000/createNewUser', { nombre,apellido, email,pin, password,pais,fechanacimiento, role, estado });
          console.log(response.data);
          navigate("/UserList");
        } catch (error) {
          console.error(error.response.data);
        }
      };
      
      return (
        <div className="container mt-4">
          <h2 className="mb-4">Crear Nuevo Usuario</h2>
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
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Rol:</label>
              <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="estado" className="form-label">Estado:</label>
              <input type="text" className="form-control" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Crear Usuario</button>
          </form>
          <Link to="/UserList" className="mt-3 d-block">Ir a la lista de usuarios</Link>
        </div>
      );
    };
    
    export default CreateUser;