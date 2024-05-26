import './App.css';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CrudCompania from "./pagesAdmin/CrudCompania";
import CrudBus from './pagesAdmin/CrudBus';
import ListarCompañias from './pagesAdmin/ListarCompañias';
import Admin from './pagesAdmin/Admin';
import HomeUser from './pages/HomeUser';
import LoginAdmin from './pages/LoginAdmin';
import Usuario from "./pages/Usuario"
import HomeAdmin from "./pagesAdmin/HomeAdmin.js"

function App() {
  return (
    <div>
      
  
      <Routes>
      
        <Route path="admin" element={<Admin/>}>
          <Route path="/admin" element={<HomeAdmin/>} />
          <Route path="agregarCompania" element={<CrudCompania />} />
          <Route path="agregarBus" element={<CrudBus />} />
          <Route path="listarCompañias" element={<ListarCompañias />} />
        </Route>

        <Route path="/" element={<Usuario/>}>
          <Route path="/" element={<HomeUser />} />
          <Route path="loginAdmin" element={<LoginAdmin />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
