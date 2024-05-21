import { Outlet } from "react-router-dom";
import OffcanvasHome from './OffcanvasHome';

function Usuario() {
  return (
    <div>
        <OffcanvasHome />
        <Outlet/>
    </div>
  );
}

export default Usuario;
