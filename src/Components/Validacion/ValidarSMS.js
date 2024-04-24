import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import './validateSMS.css';
import sweet from 'sweetalert';


const monstrarAlertaSucess = () => {

  sweet({
    title: "Validación realizada con éxito",
    text: "",
    icon: "success",
    buttons: "Aceptar"
  });

}

const monstrarError = () => {

  sweet({
    title: "Erorr al validar el código",
    text: "Intentalo de nuevo",
    icon: "error",
    buttons: "Aceptar"
  });

}

const ValidarSMS = () => { 
  
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const phoneNumber = sessionStorage.getItem("phone");

  const verifyCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verifyCode', { phoneNumber, code });
      monstrarAlertaSucess();
      navigate("/HomePage");
    } catch (error) {
      monstrarError();
      console.error(error);
      
    }
  };

  return (
    <div className="App">
      <h1 className='title'>Verificación de Número de Teléfono</h1>
      <div className=''>
        
        <input className='numeros' type="text" placeholder="Código de verificación" value={code} onChange={(e) => setCode(e.target.value)} required />
        <button onClick={verifyCode}>Verificar</button>
      </div>
      <p>{message}</p>
    </div >
  );
}

export default ValidarSMS;