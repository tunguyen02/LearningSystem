import { Button, Input, message } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://learningsystem-xwsq.onrender.com/api/v1/users/login",
        data
      );
      localStorage.setItem("token", response.data.token);
      message.success("Login successful");
      const user = jwtDecode(response.data.token);
      user.role === "Admin"
        ? navigate("/admin/dashboard")
        : navigate("/user/home");
    } catch (error) {
      console.error("Login failed", error);
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="flex">
      <div className="flex-[4] h-screen">
        <img
          src="/login.svg"
          className="h-full w-full object-bottom object-cover"
          alt=""
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-[3] flex flex-col w-full items-center justify-center px-32 gap-5"
      >
        <h1 className="text-3xl font-semibold">Sign in to your account</h1>

        {/* Email Input */}
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} size="large" placeholder="Email ID" />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} size="large" placeholder="Password" />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Sign In Button */}
        <div className="flex flex-col w-full gap-2">
          <div>
            <Button
              htmlType="submit"
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
