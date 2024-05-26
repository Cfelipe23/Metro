import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function OffcanvasHome() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const toggleOffcanvas = () => {
        setShowOffcanvas(!showOffcanvas);
    };

    return (
        <div className="container-fluid">
            <div className="row align-items-center">
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={toggleOffcanvas}>
                        <i className="bi bi-list"></i>
                    </button>
                </div>
                <div className="col">
                    <h1 className="display-3 fw-bold">BusWay</h1>
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
                        onClick={toggleOffcanvas}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <nav>
                        <ul>
                            <li>
                                <Link className ="link-primary link-underline-opacity-0" to="/" onClick={toggleOffcanvas}>Home</Link>
                            </li>
                            <li>
                                <Link className ="link-success link-underline-opacity-0" to="/loginAdmin" onClick={toggleOffcanvas}>Iniciar sesión</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default OffcanvasHome;
