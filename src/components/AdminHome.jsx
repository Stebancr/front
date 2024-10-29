import './styles/AdminHome.css';
import { useEffect, useState } from 'react';

function AdminHome({ user }) {
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await fetch('https://back-alpha-two.vercel.app/v1/signos/viewUser');
                const data = await response.json();

                if (response. ok) {
                    setWinners(date);
                } else {
                    console.error('Error al obtener los ganadores:', data.message);
                        
                    setWinners(date);
                }
            } catch (error) {
                console.error('Error al conectarse al servidor:', error);
            }
        };

        fetchWinners();
    }, []);

    return (
        <div className="container">
            <h1>Lista de Ganadores</h1>
            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Fecha de Registro</th>
                            <th>Nombre del Ganador</th>
                            <th>Cédula</th>
                            <th>Teléfono</th>
                            <th>Código Usado</th>
                            <th>Monto del Premio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winners.map((winner, index) => (
                            <tr key={index}>
                                <td>{winner.fechaRegistro}</td>
                                <td>{winner.username}</td>
                                <td>{winner.cedula}</td>
                                <td>{winner.celular}</td>
                                <td>{winner.codigo}</td>
                                <td>{winner.premio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminHome;
