import { Button, Input } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <div className="flex-[4] h-screen">
        <img
          src="/public/login.svg"
          className="h-full w-full object-bottom object-cover"
          alt=""
        />
      </div>
      <form className="flex-[3] flex flex-col w-full items-center justify-center px-32 gap-5">
        <h1 className="text-3xl font-semibold">Create Your Account</h1>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">Full Name</label>
          <div className="flex gap-5">
            <Input className="flex-[1]" size="large" placeholder="First Name" />
            <Input className="flex-[1]" size="large" placeholder="Last Name" />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">Email</label>
          <Input size="large" placeholder="Email ID" />
        </div>
        <div className="flex w-full gap-5">
          <div className="flex-[1]">
            <label className="font-semibold">Password</label>
            <Input.Password size="large" placeholder="Password" />
          </div>
          <div className="flex-[1]">
            <label className="font-semibold">Confirm Password</label>
            <Input.Password size="large" placeholder="Confirm Password" />
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div>
            <Button
              iconPosition="end"
              icon={<FaArrowRight size={20} />}
              type="primary"
              size="large"
            >
              Create Account
            </Button>
          </div>
          <p className="text-sm text-gray-700">
            If you already have an account please{" "}
            <strong
              onClick={() => navigate("/auth/login")}
              className="font-semibold text-black cursor-pointer"
            >
              Log In
            </strong>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
