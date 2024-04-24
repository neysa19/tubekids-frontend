import React, { useState } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import sweet from 'sweetalert';


const monstrarAlertaSucess = () => {

  sweet({
    title: "Correo Validado con Éxito.",
    text: "El registro se a realizado con éxito.",
    icon: "success",
    buttons: "Aceptar"
  });

}
const monstrarAlertaError = () => {

  sweet({
    title: "Su correo no es válido",
    text: "",
    icon: "error",
    buttons: "Aceptar"
  });

}

const ValidarSendEmail = () => {
  
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();
  const { token } = useParams();


  const validarEmail = async (e) => {

    e.preventDefault();
    try {

      const response = await axios.get(`http://localhost:3000/validarEmail?token=${token}`);
      const token = response.data.token; // Asegúrate de que el servidor envíe el token en la respuesta
      
      monstrarAlertaSucess();
      navigate("/");
    } catch (error) {
      monstrarAlertaError();
      console.error(error);
    }
  };


  return (
    <div className='all'>
      <h2 className='title'>Validación</h2>
      <form onSubmit={validarEmail}>
        
        <button type="submit" className='btn-register'>Validar</button>
        
      </form>
    </div>
  );
};

export default ValidarSendEmail;