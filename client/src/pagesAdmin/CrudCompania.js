import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function CrudCompania() {
    //-----------Variables que se van usar (Inicializacion)
    const [id_compania, setIdCompania] = useState();
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState(0);
    const [correo, setCorreo] = useState("");
    const [companiaList, setCompania] = useState([]);

    const [editar, setEditar] = useState(false);

    //-----------Metodos que se van a usar

    //.....Compañias
    const agregarCompania = () => {
        Axios.post("http://localhost:3001/createCompania", {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
        }).then(() => {
            getCompania();
            limpiarCampos();
            MySwal.fire({
                icon: "success",
                title: "<strong>Registro Exitoso</strong>",
                html: "<i>La compañia <strong>" + nombre + "</strong> fue registrada con exito</i>",
                timer: 4000,
            });
        }).catch(error => {
            console.error('Error al agregar compañia:', error);
        });
    }
    const update = () => {
        Axios.put("http://localhost:3001/updateCompania", {
            id: id_compania,
            nombre: nombre,
            correo: correo,
            telefono: telefono
        }).then(() => {
            getCompania()
            limpiarCampos();
            MySwal.fire({
                icon: "info",
                title: "<strong>Actualizacion Exitosa</strong>",
                html: "<i> El empleado <strong>" + nombre + "</strong> fue actualizado con exito</i>",
                timer: 4000
            });
        });
    }
    const getCompania = () => {
        Axios.get("http://localhost:3001/compania").then((response) => {
            setCompania(response.data);
        }).catch(error => {
            console.error('Error al obtener compañias:', error);
        });
    }

    const editarCompania = (val) => {
        setNombre(val.nombre);
        setCorreo(val.correo);
        setTelefono(val.telefono);
        setIdCompania(val.id_compania);
        setEditar(true);
    }

    const deleteCompania = (val) => {
        MySwal.fire({
            title: "Eliminar",
            text: "¿Quieres eliminar a " + val.nombre + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/deleteCompania/${val.id_compania}`).then((res) => {
                    getCompania();
                    limpiarCampos();
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Se eliminó la compañia",
                        icon: "success",
                    });
                }).catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No se logró eliminar la compañia",
                        footer: JSON.parse(JSON.stringify(error)).message
                    });
                });
            }
        });
    }

    useEffect(() => {
        getCompania();
    }, []);

    const limpiarCampos = () => {
        setNombre("");
        setTelefono("");
        setCorreo("");
        setIdCompania(null);
        setEditar(false)
    }

    return (
        <div className="container">
            <br />
            {/* Parte donde se agregan datos de la compañia de buses */}
            <div className="RectanguloCompania px-4 py-3">
                <br />
                <div className="input-group mb-2 ">
                    <span className="input-group-text" id="basic-addon1">Nombre</span>
                    <input
                        type="text"
                        onChange={(event) => { setNombre(event.target.value) }}
                        className="form-control"
                        value={nombre}
                        placeholder="Nombre de la compañia"
                        aria-label="Nombre"
                        aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-2">
                    <span className="input-group-text" id="basic-addon1">Correo</span>
                    <input
                        type="text"
                        onChange={(event) => { setCorreo(event.target.value) }}
                        className="form-control"
                        value={correo}
                        placeholder="Correo de la compañia"
                        aria-label="Correo"
                        aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-2">
                    <span className="input-group-text" id="basic-addon1">Telefono</span>
                    <input
                        type="number"
                        value={telefono}
                        onChange={(event) => { setTelefono(event.target.value) }}
                        className="form-control"
                        placeholder="Telefono de la compañia"
                        aria-label="Telefono"
                        aria-describedby="basic-addon1" />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        {
                            editar ? <div>
                                <button className="btn btn-success rounded-pill px-3 mx-3 mb-3"
                                    onClick={update}> Actualizar</button>
                                <button className="btn btn-secondary rounded-pill px-3 mx-3 mb-3"
                                    onClick={limpiarCampos}> Cancelar</button>
                            </div>

                                : <button type="button"
                                    className="btn btn-success rounded-pill px-3 mx-3 mb-3"
                                    style={{ borderRadius: '10%' }}
                                    onClick={agregarCompania}>Guardar Compañia</button>
                        }
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="table-responsive">

                <table className="table  table-bordered">
                    <thead>
                        <tr>
                            <th className="table-success text-center" scope="col">ID</th>
                            <th className="table-success text-center" scope="col">Nombre Compañia</th>
                            <th className="table-success text-center" scope="col">Correo</th>
                            <th className="table-success text-center" scope="col">Telefono</th>
                            <th className="table-success text-center" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companiaList.map((val, key) => {
                            return (
                                <tr key={val.id_compania}>
                                    <th className="text-center" >{val.id_compania}</th>
                                    <td className="text-center">{val.nombre}</td>
                                    <td className="text-center">{val.correo}</td>
                                    <td className="text-center">{val.telefono}</td>
                                    <td>
                                        <div className=" Centrar" role="group" aria-label="Basic mixed styles example">
                                            <button

                                                type="button"
                                                onClick={() => { editarCompania(val) }}
                                                className="btn btn-warning rounded-pill px-3 mx-1" style={{ borderRadius: '10%'}}>Editar</button>
                                            <button
                                                type="button "
                                                onClick={() => { deleteCompania(val) }}
                                                className="btn btn-danger rounded-pill px-3 mx-1" style={{ borderRadius: '10%'}}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table >
            </div>
        </div >
    );
}

export default CrudCompania;
