import { Button, Input } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
        <h1 className="text-3xl font-semibold">Sign in to your account</h1>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">Email</label>
          <Input size="large" placeholder="Email ID" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">Password</label>
          <Input.Password size="large" placeholder="Password" />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div>
            <Button
              iconPosition="end"
              icon={<FaArrowRight size={20} />}
              type="primary"
              size="large"
            >
              Sign In
            </Button>
          </div>
          <p className="text-sm text-gray-700">
            If you do not have an account, please{" "}
            <strong
              onClick={() => navigate("/auth/register")}
              className="font-semibold text-black cursor-pointer"
            >
              Register
            </strong>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
