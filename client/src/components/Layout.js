import { Outlet } from "react-router-dom";

import OffcanvasExample from './OffcanvasExample';
function Layout() {
  

  return (
    <div>
      <OffcanvasExample />
      <Outlet />
    </div>
  );
}

export default Layout;
