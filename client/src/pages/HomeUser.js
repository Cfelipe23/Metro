import "./App.css"
import { useState, useEffect } from "react";
import Axios from "axios";

function HomeUser() {
    
    const [listaBuses, setListaBuses] = useState([]);
    
    // Estado para almacenar el término de búsqueda
    const [terminoBusqueda, setTerminoBusqueda] = useState('');

    // Función para obtener la lista de autobuses al cargar el componente
    useEffect(() => {
        obtenerBuses();
    }, []);

    // Función para obtener la lista de autobuses desde la API
    const obtenerBuses = () => {
        Axios.get("http://localhost:3001/bus")
            .then((respuesta) => {
                setListaBuses(respuesta.data);
            })
            .catch((error) => {
                console.error("Error al obtener los autobuses:", error);
            });
    };

    // Función para manejar cambios en el campo de búsqueda
    const manejarCambioBusqueda = (evento) => {
        setTerminoBusqueda(evento.target.value);
    };

    // Filtrar la lista de autobuses según el término de búsqueda
    const listaBusesFiltrada = listaBuses.filter((bus) =>
        bus.lugares.toLowerCase().replace(/\s+/g, '').includes(terminoBusqueda.toLowerCase().replace(/\s+/g, ''))
    );

    return (
        <div>
            <div className="container">
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <i className="navbar-brand">¿A dónde quieres ir?</i>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Escriba Lugar"
                                aria-label="Search"
                                value={terminoBusqueda}
                                onChange={manejarCambioBusqueda}
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Buscar
                            </button>
                        </form>
                    </div>
                </nav>
                <br />
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="table-success text-center" scope="col">Nombre Compañía</th>
                                <th className="table-success text-center" scope="col">Número de Ruta</th>
                                <th className="table-success text-center" scope="col">Placa del Bus</th>
                                <th className="table-success text-center" scope="col">Lugares</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaBusesFiltrada.map((bus) => (
                                <tr key={bus.id_bus}>
                                    <td className="text-center">{bus.compania}</td>
                                    <td className="text-center">{bus.numeroBus}</td>
                                    <td className="text-center">{bus.placa}</td>
                                    <td className="text-center">{bus.lugares}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HomeUser;
