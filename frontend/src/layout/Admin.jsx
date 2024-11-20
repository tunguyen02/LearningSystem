import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { IoGridOutline, IoReceiptOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";

const data = [
  {
    icon: <IoGridOutline size={25} />,
    title: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <IoPeopleOutline size={25} />,
    title: "Users",
    path: "/admin/users",
  },
  {
    icon: <IoBookOutline size={25} />,
    title: "Courses",
    path: "/admin/courses",
  },
  {
    icon: <IoReceiptOutline size={25} />,
    title: "Course Order",
    path: "/admin/course-order",
  },
];

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Menu data={data} />
      <div className="ml-60 mt-16 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
