/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const Menu = ({ data, isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? "opacity-100 z-20" : "opacity-0 z-[-1]"
          }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed left-0 top-0 w-60 h-screen bg-white p-1 flex flex-col gap-3 rounded-lg z-30 pt-5 border-r shadow-xl transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center gap-x-2 px-3 mx-3 mb-2">
          <img src="logo.svg" alt="Logo" className="h-16" />
          <p className="font-semibold text-3xl">Byway</p>
        </div>
        {Array.isArray(data) &&
          data.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-5 mx-3 hover:bg-blue-200 p-3 px-4 rounded-full cursor-pointer ${isActive
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
    </>
  );
};

export default Menu;
