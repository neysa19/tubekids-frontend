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
        <div>
          <h2>Crear Nuevo Usuario</h2>
          <form onSubmit={handleRegister}>
            <label>
              Nombre:
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>
            <label>
              Apellido:
              <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              PIN:
              <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} />
            </label>
            <label>
              Contraseña:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
              País:
              <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} />
            </label>
            <label>
              Fecha de Nacimiento:
              <input type="date" value={fechanacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
            </label>
            <label>
              Rol:
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </label>
            <label>
              Estado:
              <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
            </label>
            <button type="submit">Crear Usuario</button>
          </form>
          <Link to="/UserList">Ir a la lista de usuarios</Link>
        </div>
      );
    };
    
    export default CreateUser;