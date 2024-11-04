import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Menu from "./Menu";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Menu />
      <div className="ml-60 mt-16 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
