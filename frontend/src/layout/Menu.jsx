import { IoGridOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoSchoolOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

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
    icon: <IoSchoolOutline size={25} />,
    title: "Teachers",
    path: "/admin/teachers",
  },
  {
    icon: <IoBookOutline size={25} />,
    title: "Courses",
    path: "/admin/courses",
  },
  {
    icon: <IoSettingsOutline size={25} />,
    title: "Setting",
    path: "/admin/setting",
  },
];

const Menu = () => {
  return (
    <div className="fixed left-0 top-0 w-60 h-screen">
      <div className="bg-white p-1 flex flex-col gap-3 h-full rounded-lg z-10 pt-20 border-r shadow-xl">
        {data.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-5 mx-3 hover:bg-blue-200 p-3 px-4 rounded-full cursor-pointer ${
                isActive
                  ? "bg-blue-200 text-blue-600 font-semibold border-blue-600 border-l-2"
                  : ""
              }`
            }
          >
            {item.icon}
            <p className="text-lg">{item.title}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Menu;
