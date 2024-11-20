import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Menu from "./Menu";
import {
  IoReceiptOutline,
  IoBookOutline,
  IoHomeOutline,
} from "react-icons/io5";

const data = [
  {
    icon: <IoHomeOutline size={25} />,
    title: "Home",
    path: "/user/home",
  },
  {
    icon: <IoBookOutline size={25} />,
    title: "All Courses",
    path: "/user/courses",
  },
  {
    icon: <IoReceiptOutline size={25} />,
    title: "Course Order",
    path: "/user/course-order",
  },
];

const User = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div>
      <Navbar onToggleMenu={toggleMenu} />
      <Menu data={data} isOpen={isMenuOpen} onClose={closeMenu} />
      <div className="bg-gray-100 p-5 pt-24 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default User;
