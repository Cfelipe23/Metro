import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function LoginAdmin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 

    function handleSubmit(event) {
        event.preventDefault();
        Axios.post('http://localhost:3001/login', { email, password })
            .then((response) => {
                if (response.data.success) {
                    navigate('/admin');
                    MySwal.fire({
                        icon: "success",
                        title: "<strong>Inicio de sesión</strong>",
                        html: "<i>Inicio de sesión correcto</i>",
                        timer: 4000,
                    });
                } else {
                    setError(response.data.message); // Establecer el mensaje de error
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='container Rectangulo '>
            <form className="px-4 py-3" onSubmit={handleSubmit}>
                <div className={`mb-3 ${error ? 'has-error' : ''}`}> {/* Agregar la clase 'has-error' si hay un error */}
                    <label htmlFor="exampleDropdownFormEmail1" className="form-label">Dirección de correo</label>
                    <input
                        type="email"
                        className={`form-control ${error ? 'is-invalid' : ''}`} // Agregar la clase 'is-invalid' si hay un error
                        id="exampleDropdownFormEmail1"
                        placeholder="email@example.com"
                        onChange={e => setEmail(e.target.value)} />
                    {error && <div className="invalid-feedback">{error}</div>} {/* Mostrar el mensaje de error si hay uno */}
                </div>

                <div className={`mb-3 ${error ? 'has-error' : ''}`}> {/* Agregar la clase 'has-error' si hay un error */}
                    <label htmlFor="exampleDropdownFormPassword1" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className={`form-control ${error ? 'is-invalid' : ''}`} // Agregar la clase 'is-invalid' si hay un error
                        id="exampleDropdownFormPassword1"
                        placeholder="Contraseña"
                        onChange={e => setPassword(e.target.value)} />
                    {error && <div className="invalid-feedback">{error}</div>} {/* Mostrar el mensaje de error si hay uno */}
                </div>
                <div className="Centrar mb-3 ">
                    <button className="btn btn-success">Iniciar sesión</button>
                </div>
            </form>
            <div className="dropdown-divider"></div>
        </div>
    )
}

export default LoginAdmin
