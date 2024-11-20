import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { IoReceiptOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";

const data = [
  {
    icon: <IoBookOutline size={25} />,
    title: "Courses",
    path: "/user/courses",
  },
  {
    icon: <IoReceiptOutline size={25} />,
    title: "Course Order",
    path: "/user/course-order",
  },
];

const User = () => {
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

export default User;
