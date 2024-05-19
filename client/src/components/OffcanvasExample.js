import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function OffcanvasExample() {
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
            <button
                className="btn btn-primary"
                type="button"
                onClick={() => setShowOffcanvas(true)}
            >
                <i className="bi bi-list"></i>
            </button>

            <div
                className={`offcanvas offcanvas-start ${showOffcanvas ? 'show' : ''}`}
                data-bs-scroll="true"
                tabIndex="-1"
                id="offcanvasWithBothOptions"
                aria-labelledby="offcanvasWithBothOptionsLabel"
                
                style={{ width: '250px', maxWidth: '80%' }} // Ajuste de ancho del offcanvas
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
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
                                <Link to="/" onClick={closeMenu}>Perfil</Link>
                            </li>
                            <li>
                                <Link to="/agregarCompania" onClick={closeMenu}>Agregar Compañia</Link>
                            </li>
                            <li>
                                <Link to="/agregarBus" onClick={closeMenu}>Agregar Bus</Link>
                            </li>
                            <li>
                                <Link to="/listarCompañias" onClick={closeMenu}>Listar Compañías</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default OffcanvasExample;
