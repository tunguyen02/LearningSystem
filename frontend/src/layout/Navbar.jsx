import { Button, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const check = localStorage.getItem("token");

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };
  return (
    <div className="fixed top-0 z-20 w-full px-8 py-4 flex items-center justify-between bg-white shadow-md">
      <div className="flex items-center gap-x-10">
        <div className="flex items-center gap-x-2">
          <img src="/public/logo.svg" alt="Logo" className="h-10" />
          <p className="font-semibold text-lg">Byway</p>
        </div>
        <p className="cursor-pointer">Categories</p>
        <Input
          prefix={<CiSearch size={20} />}
          placeholder="Search courses"
          className="w-64"
        />
        <p className="cursor-pointer">Teach on Byway</p>
      </div>
      {check ? (
        <div className="flex items-center gap-x-4">
          <IoCartOutline size={30} className="cursor-pointer" />
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
          <IoCartOutline size={30} className="cursor-pointer" />
          <Button>Log In</Button>
          <Button type="primary">Sign Up</Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
