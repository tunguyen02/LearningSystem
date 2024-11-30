import NavbarMenu from "./NavbarMenu";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <NavbarMenu />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
