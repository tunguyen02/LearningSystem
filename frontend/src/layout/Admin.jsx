import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { IoGridOutline, IoReceiptOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { useState } from "react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <div>
      <Navbar onToggleMenu={toggleMenu} />
      <Menu data={data} isOpen={isMenuOpen} onClose={closeMenu} />
      <div className="mt-16 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
