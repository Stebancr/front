import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const validateAdmin = async (event) => {
        event.preventDefault();
        const role = 'admin';

        try {
            const response = await fetch('http://localhost:4000/v1/signos/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role, username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                callback(role);
                goTo('/adminHome');
            } else {
                alert(data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            alert('Hubo un problema con el servidor. Intenta de nuevo más tarde.');
        }
    };

    return (
        <form onSubmit={validateAdmin}>
            <h1 id="txtBienvenida">Bienvenido Administrador, ingresa para gestionar premios</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input 
                type="text" 
                className="entry" 
                onChange={(e) => setUsername(e.target.value)} 
                required 
            /><br />
            <h4 className="txt">Contraseña</h4>
            <input 
                type="password" 
                className="entry" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />
        </form>
    );
}

export default Form;
