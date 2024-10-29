import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin({ callback }) {
    const [correo, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const validateAdmin = async (event) => {
        event.preventDefault();
        const role = 'admin';

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

export default Admin;
