import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "./imagenes/logo.png"
import promocion from "./imagenes/promocion.jpg"
import fondo from "./imagenes/fondo.jpg"

function Form({ callback }) {
    const [correo, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();
        const role = 'user';  // Solo usuarios, no admins

        try {
            const response = await fetch('https://back-alpha-two.vercel.app/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role, correo, password }),
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                callback(role);
                goTo('/userHome');  // Redirige solo a userHome
            } else {
                alert(data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            alert('Hubo un problema con el servidor. Intenta de nuevo más tarde.');
        }
    };

    
    const handleAddUserClick = () => {
        goTo('/addUser');
    };

    
    

    return (

        <div className='container2'>
            <img src={fondo} alt='fondo' className="fondo" />

            <div className="container">
                
                <img src={promocion} alt='promocion' className="promo-image" />
        
                <div className="form-container">
                    <form onSubmit={validateUser}>
                        <h1 id="txtBienvenida">Bienvenido, regístrate para reclamar tus premios</h1>
                        <h4 className="txt">Nombre de Usuario</h4>
                        <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} required /><br />
                        <h4 className="txt">Contraseña</h4>
                        <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} required /><br />
                        <input type="submit" value="Ingresar" id="btnEnviar" />
                        <button type="button" id="btnAddUser" onClick={handleAddUserClick}>Crear Nuevo Usuario</button>
                    </form>
                </div>
        
                <img src={logo} alt='logo' className="logo" />
            </div>


        </div>
        
    );
}

export default Form;
