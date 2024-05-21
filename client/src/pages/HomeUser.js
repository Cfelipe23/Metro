import "./App.css"
import { useState } from "react";
import Axios from "axios";

function HomeUser() {

    const [busesList, setBus] = useState([]);
    const getBus = () => {
            Axios.get("http://localhost:3001/bus").then((response) => {
            setBus(response.data);
        });
    };

    getBus();   

    return (
        <div>
            <div className="container"> 
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid  ">
                        <i className="navbar-brand ">¿A donde quieres ir?</i>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2"
                                type="search"
                                placeholder="Escriba Lugar"
                                aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Buscar</button>
                        </form>
                    </div>
                </nav>
                
                <br/>


                <div className="table-responsive">

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="table-success text-center" scope="col">Nombre Compañia</th>
                                <th className="table-success text-center" scope="col">Numero de Ruta</th>
                                <th className="table-success text-center" scope="col">Placa del Bus</th>
                                <th className="table-success text-center" scope="col">Lugares</th>
                            </tr>
                        </thead>
                        <tbody >
                        {busesList.map((val, key) => {
                        return (
                            <tr key={val.id_bus}>
                                <th className="text-center">{val.compania}</th>
                                <td className="text-center">{val.numeroBus}</td>
                                <td className="text-center">{val.placa}</td>
                                <td className="text-center">{val.lugares}</td>
                            </tr>
                        );
                    })}
                        </tbody>
                    </table >
                </div>
            </div>

        </div>
    )
}
export default HomeUser