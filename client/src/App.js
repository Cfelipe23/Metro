import './App.css';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./components/Layout";
import CrudRuta from "./pages/CrudRuta";
import CrudBus from './pages/CrudBus';
import ListarCompañias from './pages/ListarCompañias';


function App() {
  return (
    <div>
      <h1>BusWay</h1>
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="perfil" element={<div>Perfil</div>} />
          <Route path="agregarCompania" element={<CrudRuta />} />
          <Route path="agregarBus" element={<CrudBus />} />
          <Route path="listarCompañias" element={<ListarCompañias />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
