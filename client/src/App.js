import './App.css';
import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./components/Layout";
import CrudRuta from "./pages/CrudRuta";
import CrudBus from './pages/CrudBus';
import ListarCompañias from './pages/ListarCompañias';

//modificcar las rutas que aparecedn en los link
function App() {
  return (
    <div>
      <h1>BusWay</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route path="/crudRuta" element={<CrudRuta />} />
          <Route path="/CrudBus" element={<CrudBus />} />
          <Route path="/listarCompañias" element={<ListarCompañias />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
