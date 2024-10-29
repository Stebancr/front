import './styles/UserHome.css';
import { useEffect, useState } from 'react';

function UserHome() {
    const [codes, setCodes] = useState([]);
    const [codeInput, setCodeInput] = useState('');

    const fetchCodes = async () => {
        try {
            const response = await fetch('https://back-alpha-two.vercel.app/v1/signos/getCodes?usuarioId=6720f4d58d30103289c4ed19'); // Endpoint para obtener los códigos registrados
            const data = await response.json();
            if (response.ok) {
                setCodes(data);
            } else {
                console.error('Error al obtener los códigos:', data.message);
            }
        } catch (error) {
            console.error('Error al conectarse al servidor:', error);
        }
    };

    useEffect(() => {
        fetchCodes();
    }, []);


    const registerCode = async (event) => {
        event.preventDefault();
        // Lógica para registrar el código, puedes ajustar según tu implementación
        try {
            const response = await fetch('https://back-alpha-two.vercel.app/v1/signos/redeemCode', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codigo: codeInput, usuarioId:"6720f4d58d30103289c4ed19" }),
            });
            if (response.ok) {
                setCodeInput(''); // Limpiar el input después de registrar
                fetchCodes(); // Volver a obtener los códigos para mostrar el nuevo
            } else {
                const data = await response.json();
                console.error('Error al registrar el código:', data.message);
            }
        } catch (error) {
            console.error('Error al conectarse al servidor:', error);
        }
    };

    return (
        <div className="container">
            <h1>Registrar Código</h1>
            <form onSubmit={registerCode}>
                <input
                    type="text"
                    placeholder="Código de 4 dígitos"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
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
        </div>
    );
}


export default UserHome;
