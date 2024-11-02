import './styles/UserHome.css';
import { useEffect, useState } from 'react';
import fondo from "./imagenes/fondo.jpg";
import logo from "./imagenes/logo.png";
import promocion from "./imagenes/promocion.jpg";
 
function UserHome({ user }) {
    const [codes, setCodes] = useState([]);
    const [codeInput, setCodeInput] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    

    const fetchCodes = async () => {
        try {
            const response = await fetch(`https://back-alpha-two.vercel.app/v1/signos/getCodes?usuarioId=${user}`);
            const data = await response.json();
            if (response.ok) {
                setCodes(data);
                setError(null);
            } else {
                setError(data.error || 'Error al obtener los códigos');
            }
        } catch (error) {
            setError('Error al conectarse al servidor');
            console.error('Error al conectarse al servidor:', error);
        }
    };

    useEffect(() => {
        fetchCodes();
    }, []);

    const registerCode = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://back-alpha-two.vercel.app/v1/signos/redeemCode', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codigo: codeInput, usuarioId: user }),
            });
            const data = await response.json();
            if (response.ok) {
                setCodeInput(''); // Limpiar el input después de registrar
                fetchCodes();
                setSuccessMessage('Código registrado exitosamente');
                setError(null); // Limpiar el mensaje de error
            } else {
                setError(data.error || 'Error al registrar el código');
                setSuccessMessage(null); // Limpiar el mensaje de éxito
            }
        } catch (error) {
            setError('Error al conectarse al servidor');
            setSuccessMessage(null); // Limpiar el mensaje de éxito
            console.error('Error al conectarse al servidor:', error);
        }
    };

    const handleInputChange = (e) => {
        setCodeInput(e.target.value);
        setSuccessMessage(null); // Eliminar el mensaje de éxito al escribir un nuevo código
        setError(null); // Eliminar el mensaje de error también
    };

    

    return (
        <div className='container2'>
            <img src={fondo} alt='fondo' className="fondo" />

            <div className="container">
                <h1>Registrar Código</h1>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={registerCode}>
                    <input
                        type="text"
                        placeholder="Código de 3 numeros"
                        value={codeInput}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Registrar</button>
                </form>

                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Fecha de Registro</th>
                                <th>Código Usado</th>
                                <th>Monto del Premio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {codes.map((code, index) => (
                                <tr key={index}>
                                    <td>{code.fechaRegistro}</td>
                                    <td>{code.codigo}</td>
                                    <td>{code.premio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <a href="https://front-three-olive.vercel.app" className="back-link">Volver al Inicio</a>
            </div>
        </div>
    );
}

export default UserHome;
