import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Menu from "./Menu";
import {
  IoReceiptOutline,
  IoBookOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { Footer } from "antd/es/layout/layout";

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
        <Footer className="bg-gray-200 py-8 text-gray-800">
          <div className="container mx-auto flex flex-wrap justify-between space-y-8 sm:space-y-0 sm:flex-row">
            <div className="flex-1 space-y-4 sm:mr-12">
              <h2 className="text-3xl font-bold text-sky-400">Byway</h2>
              <p className="text-sm text-gray-600">
                LearnPress is a comprehensive WordPress LMS Plugin for
                WordPress. This is one of the best WordPress LMS Plugins which
                can be used to easily create & sell courses online.
              </p>
            </div>

            <div className="flex-1 flex flex-col sm:mr-12">
              <h4 className="font-bold text-lg text-gray-800 mb-4">GET HELP</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-sky-400">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-sky-400">
                    Latest Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-sky-400">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* <div className="flex-1 flex flex-col sm:mr-12">
            <h4 className="font-bold text-lg text-gray-800 mb-4">PROGRAMS</h4>
            <ul className="space-y-2">
              {Object.entries(categorizedCourses).map(([category]) => (
                <li key={category}>
                  <a href="#" className="text-gray-600 hover:text-sky-400">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

            <div className="flex-1">
              <h4 className="font-bold text-lg text-gray-800 mb-4">
                CONTACT US
              </h4>
              <p className="text-gray-600">
                23 New Design Str, Lorem Ipsum10 Hudson Yards, USA
              </p>
              <p className="text-gray-600">Tel: + (123) 2500-567-8988</p>
              <p className="text-gray-600">Email: support@lms.com</p>
              <div className="flex space-x-3 mt-4">
                <span className="bg-sky-400 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                  F
                </span>
                <span className="bg-sky-400 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                  P
                </span>
                <span className="bg-sky-400 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                  X
                </span>
                <span className="bg-sky-400 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                  I
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-6 mt-6 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Learning. All rights reserved.
            </p>
          </div>
        </Footer>
      </div>
    </div>
  );
};

export default User;
