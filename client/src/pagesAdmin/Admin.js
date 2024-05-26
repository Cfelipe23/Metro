import { Outlet } from "react-router-dom";
import OffcanvasAdmin from './OffcanvasAdmin';

function Admin() {
    return (
        <div>
           <OffcanvasAdmin />
            <Outlet />
        </div>
    );
}
export default Admin