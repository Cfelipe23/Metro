import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function CrudBus() {
    const [editar, setEditar] = useState(false);

    const [companiaSeleccionada, setCompaniaSeleccionada] = useState("");
    const [companias, setCompanias] = useState([]);

    const [idBus, setIdBus] = useState(null);
    const [numeroBus, setNumeroBus] = useState("");
    const [placa, setPlaca] = useState("");
    const [lugares, setLugares] = useState([""]);
    const [busesList, setBus] = useState([]);

    useEffect(() => {
        obtenerCompanias();
        getBus();
    }, []);

    const obtenerCompanias = () => {
        Axios.get("http://localhost:3001/selectCompania")
            .then(response => {
                setCompanias(response.data);
            })
            .catch(error => {
                console.error('Error al obtener empresas:', error);
            });
    };

    const handleChangeCompania = (event) => {
        setCompaniaSeleccionada(event.target.value);
    };

    const handleLugaresChange = (index, value) => {
        const agregarLugares = [...lugares];
        agregarLugares[index] = value;
        setLugares(agregarLugares);
    };

    const agregarLugar = () => {
        setLugares([...lugares, '']);
    };

    const eliminarLugar = (index) => {
        const agregarLugares = [...lugares];
        agregarLugares.splice(index, 1);
        setLugares(agregarLugares);
    };

    const agregarBus = () => {
        Axios.post("http://localhost:3001/createBus", {
            numeroBus: numeroBus,
            placa: placa,
            lugares: lugares,
            companiaSeleccionada: companiaSeleccionada,
        }).then(() => {
            getBus();
            limpiarCampos();
            MySwal.fire({
                icon: "success",
                title: "<strong>Registro Exitoso</strong>",
                html: "<i>El autobús con número " + numeroBus + " fue registrado con éxito</i>",
                timer: 4000,
            });
        }).catch(error => {
            console.error('Error al agregar bus:', error);
        });
    };
    const update = () => {
        Axios.put("http://localhost:3001/updateBus", {
            id: idBus,
            numeroBus: numeroBus,
            placa: placa,
            lugares: lugares,
            companiaSeleccionada: companiaSeleccionada,
        }).then(() => {
            getBus()
            limpiarCampos();
            MySwal.fire({
                icon: "info",
                title: "<strong>Actualizacion Exitosa</strong>",
                html: "<i> El empleado <strong>" + numeroBus + "</strong> fue actualizado con exito</i>",
                timer: 4000
            });
        });
    }
    const editarBus = (val) => {
        setNumeroBus(val.numeroBus);
        setPlaca(val.placa);
        setCompaniaSeleccionada(val.compania);
        setLugares(val.lugares.split(',')); // Assuming 'lugares' is a comma-separated string
        setIdBus(val.id_bus); // Make sure to set the id for future updates
        setEditar(true);
    };

    const deleteBus = (val) => {
        MySwal.fire({
            title: "Eliminar",
            text: "¿Quieres eliminar a " + val.numeroBus + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/deleteBus/${val.id_bus}`).then((res) => {
                    getBus();
                }).catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No se logró eliminar el usuario",
                        footer: JSON.parse(JSON.stringify(err)).message
                    });
                });
                Swal.fire({
                    title: "Eliminado!",
                    text: "Se eliminó el usuario",
                    icon: "success",
                });
            }
        });
    };

    const getBus = () => {
        Axios.get("http://localhost:3001/bus").then((response) => {
            setBus(response.data);
        });
    };

    const limpiarCampos = () => {
        setNumeroBus("");
        setPlaca("");
        setLugares([""]);
        setCompaniaSeleccionada("");
        setIdBus(null);
        setEditar(false);
    };

    return (
        <div className="container">
            <br />
            <div className="RectanguloCompania">
                <br />
                <div className="input-group mb-2">
                    <span className="input-group-text" id="basic-addon1">Numero de Ruta</span>
                    <input
                        type="text"
                        value={numeroBus}
                        onChange={(event) => { setNumeroBus(event.target.value) }}
                        className="form-control"
                        placeholder="Ingrese numero de la ruta"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <select
                        className="form-select"
                        id="inputGroupSelect02"
                        value={companiaSeleccionada}
                        onChange={handleChangeCompania}
                    >
                        <option value="">Compañia</option>
                        {companias.map((compania, index) => (
                            <option key={index} value={compania.nombre}>{compania.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text" id="basic-addon1">Placa</span>
                    <input 
                        type="text"
                        value={placa}
                        onChange={(event) => { setPlaca(event.target.value) }}
                        className="form-control"
                        placeholder="Ingrese placa del bus" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1" 
                    />
                </div>
                {lugares.map((lugar, index) => (
                    <div key={index}>
                        <div className="input-group mb-2">
                            <span className="input-group-text" id="basic-addon1">Lugar {index + 1}</span>
                            <input 
                                type="text"
                                value={lugar}
                                onChange={(event) => handleLugaresChange(index, event.target.value)}
                                className="form-control"
                                placeholder={`Lugar ${index + 1}`}
                                aria-label={`Lugar ${index + 1}`}
                                aria-describedby="basic-addon1" />
                            {lugares.length > 1 && <button className="btn btn-danger" onClick={() => eliminarLugar(index)}>-</button>}
                            {index === lugares.length - 1 && <button className="btn btn-success " onClick={agregarLugar}>+</button>}
                        </div>
                    </div>
                ))}
                <div className="d-flex justify-content-center align-items-center">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    {
                       editar ? <div>
                            <button 
                                className="btn btn-success rounded-pill px-3 mx-3 mb-3"
                                onClick={update}> Actualizar</button>
                            <button 
                                className="btn btn-secondary rounded-pill px-3 mx-3 mb-3"
                                onClick={limpiarCampos}> Cancelar</button>
                        </div>
                            : <button 
                            type="button" 
                            className="btn btn-success rounded-pill px-3 mx-3 mb-3"
                            style={{ borderRadius: '10%' }} 
                            onClick={agregarBus}>Guardar Auto-Bus</button>
                    }
                    </div>
                </div>
            </div>
            <br />

            <div className="table-responsive"> 
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="table-success text-center" scope="col">ID</th>
                        <th className="table-success text-center" scope="col">Numero de Ruta</th>
                        <th className="table-success text-center" scope="col">Placa</th>
                        <th className="table-success text-center" scope="col">Compañia</th>
                        <th className="table-success text-center" scope="col">Lugares por recorrer</th>
                        <th className="table-success text-center" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {busesList.map((val, key) => {
                        return (
                            <tr key={val.id_bus}>
                                <th>{val.id_bus}</th>
                                <td>{val.numeroBus}</td>
                                <td>{val.placa}</td>
                                <td>{val.compania}</td>
                                <td>{val.lugares}</td>
                                <td>
                                     <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button 
                                        type="button" 
                                        onClick={() => editarBus(val)}
                                        className="btn btn-warning">Editar</button>
                                        <button 
                                        type="button" 
                                        onClick={() => deleteBus(val)}
                                        className="btn btn-danger">Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table >


            </div>
            <div className="Centrar">
                <Link to="/" className='btn btn-success rounded-pill px-3'>Regresar</Link>
            </div>
        </div>

    );
}
export default CrudBus;