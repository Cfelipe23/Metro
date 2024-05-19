import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <nav className="nav">
                <Link to="/" className="nav-link active" aria-current="page">Perfil</Link>
                <Link to="/CrudRuta" className="nav-link">Agregar Compañia</Link>
                <Link to="/CrudBus" className="nav-link">Agregar Bus </Link>
                <Link to="/listarCompañias" className="nav-link">ListarCompañias </Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;
