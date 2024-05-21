
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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mensaje, setMensaje] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        Axios.post('http://localhost:3001/login', { email, password })
            .then((response) => {
                if (response.data.success) {
                    navigate('/admin');
                    MySwal.fire({
                        icon: "success",
                        title: "<strong>Inicio de sesion</strong>",
                        html: "<i>Inicio de sesion correcto</i>",
                        timer: 4000,
                    });
                } else {
                    setMensaje(response.data.message);
                }
            })
            .catch(err => console.log(err));
    }

    return (

        <div className='container Rectangulo '>
            <form className="px-4 py-3"
                onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleDropdownFormEmail1" className="form-label">Direccion de correo</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleDropdownFormEmail1"
                        placeholder="email@example.com"
                        onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label for="exampleDropdownFormPassword1" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleDropdownFormPassword1"
                        placeholder="Contraseña"
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="Centrar mb-3 ">
                    <button className="btn btn-success">Iniciar secion</button>
                </div>

            </form>
            <div className="dropdown-divider"></div>
            {mensaje && <p>{mensaje}</p>}

        </div>
    )

}
export default LoginAdmin