/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const Menu = ({ data }) => {
  return (
    <div className="fixed left-0 top-0 w-60 h-screen">
      <div className="bg-white p-1 flex flex-col gap-3 h-full rounded-lg z-10 pt-20 border-r shadow-xl">
        {Array.isArray(data) &&
          data.map((item, index) => (
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
