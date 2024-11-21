/* eslint-disable react/prop-types */
import { Button } from "antd";
import { CiBellOn } from "react-icons/ci";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";

const Navbar = ({ onToggleMenu }) => {
  const check = localStorage.getItem("token");

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };
  return (
    <div className="fixed top-0 z-20 w-full px-8 py-4 flex items-center justify-between bg-white shadow-md">
      <div className="flex items-center gap-x-10">
        <HiOutlineMenu
          size={30}
          className="cursor-pointer"
          onClick={onToggleMenu}
        />
        <div className="flex items-center gap-x-2">
          <img src="/public/logo.svg" alt="Logo" className="h-10" />
          <p className="font-semibold text-lg">Byway</p>
        </div>
      </div>
      {check ? (
        <div className="flex items-center gap-x-4">
          <CiBellOn size={30} className="cursor-pointer" />
          <img
            className="w-10 h-10 rounded-full"
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt=""
          />
          <Button
            onClick={handleLogout}
            icon={<PiSignOutBold size={20} />}
            danger
          ></Button>
        </div>
      ) : (
        <div className="flex items-center gap-x-4">
          <Button
            onClick={() => {
              navigate("/auth/register");
            }}
          >
            Sign Up
          </Button>
          <Button
            onClick={() => {
              navigate("/auth/login");
            }}
            type="primary"
          >
            Log In
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
