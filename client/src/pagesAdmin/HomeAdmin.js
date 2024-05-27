import React, { useState } from 'react';
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

function HomeAdmin() {
    const [email, setEmail] = useState('admin@admin.com');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('123-456-7890');
    const [image, setImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handleImageChange = (e) => setImage(URL.createObjectURL(e.target.files[0]));

    const handleEditClick = () => {
        if (isAuthenticated) {
            setEditMode(true);
        } else {
            const passwordPrompt = prompt('Por favor, ingresa tu contraseña:');
            if (passwordPrompt) {
                Axios.post('/login', { password: passwordPrompt })
                    .then((response) => {
                        if (response.data.success) {
                            setIsAuthenticated(true);
                            setEditMode(true);
                        } else {
                            alert('Contraseña incorrecta');
                        }
                    })
                    .catch((error) => {
                        console.error('Error al autenticar:', error);
                        alert('Error al autenticar');
                    });
            }
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos actualizados al servidor
        console.log('Email:', email);
        console.log('Contraseña:', password);
        console.log('Teléfono:', phone);
        console.log('Imagen:', image);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <h2>Perfil</h2>
                        </div>
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <img
                                    src={image || 'https://via.placeholder.com/150'}
                                    alt="Foto de Perfil"
                                    className="rounded-circle"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                                <input
                                    type="file"
                                    className="form-control mt-2"
                                    onChange={handleImageChange}
                                    disabled={!editMode}
                                />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={handleEmailChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Teléfono:</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="form-control"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                {editMode && (
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Nueva Contraseña:</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                )}
                                {!editMode ? (
                                    <button type="button" className="btn btn-primary" onClick={handleEditClick}>
                                        Editar
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-success">
                                        Guardar Cambios
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
