import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function OffcanvasAdmin() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {

        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const closeMenu = () => {
        setShowOffcanvas(false);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => setShowOffcanvas(true)}
                        >
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                    <div className="col">
                        <h1 className="display-4 fw-bold">Admin BusWay</h1>
                    </div>
                </div>
            </div>

            <div
                className={`offcanvas offcanvas-start ${showOffcanvas ? 'show' : ''}`}
                data-bs-scroll="true"
                tabIndex="-1"
                id="offcanvasWithBothOptions"
                aria-labelledby="offcanvasWithBothOptionsLabel"
                style={{ width: '250px', maxWidth: '80%' }}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title fw-bold" id="offcanvasWithBothOptionsLabel">
                        Menu BusWay
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowOffcanvas(false)}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <nav>
                        <ul>
                        <li>
                                <Link className ="link-primary link-underline-opacity-0" to="/admin" onClick={closeMenu}>Perfil</Link>
                            </li>
                            <li>
                                <Link className ="link-primary link-underline-opacity-0" to="/admin/agregarCompania" onClick={closeMenu}>Agregar Compañia</Link>
                            </li>
                            <li>
                                <Link className ="link-primary link-underline-opacity-0" to="/admin/agregarBus" onClick={closeMenu}>Agregar Bus</Link>
                            </li>
                            <li>
                                <Link  className ="link-primary link-underline-opacity-0" to="/admin/listarCompañias" onClick={closeMenu}>Listar Compañías</Link>
                            </li>
                            <li>
                                <Link className="link-danger link-underline-opacity-0" to="/" onClick={closeMenu}>Cerrar sesion</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default OffcanvasAdmin;
