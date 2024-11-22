/* eslint-disable react/prop-types */
import { Button } from "antd";
import { CiBellOn } from "react-icons/ci";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Navbar = ({ onToggleMenu }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token) {
        try {
          const { exp: expirationDate } = jwtDecode(token);
          console.log(jwtDecode(token));
          const currentTime = Math.floor(Date.now() / 1000);

          if (expirationDate < currentTime) {
            localStorage.removeItem("token");
          } else {
            setName(jwtDecode(token).name);
          }
        } catch (err) {
          console.error("Invalid token:", err);
          localStorage.removeItem("token");
        }
      }
    };
    checkTokenExpiration();
  }, [token]);

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
      {token ? (
        <div className="flex items-center gap-x-4">
          <CiBellOn size={30} className="cursor-pointer" />
          <img
            className="w-10 h-10 rounded-full"
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt=""
          />
          <p className="font-semibold text-lg">{name}</p>
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
