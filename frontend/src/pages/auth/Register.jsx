import { Button, Input, message } from "antd";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const name = `${data.firstName} ${data.lastName}`;
      const { email, password } = data;
      const dataSubmit = { name, email, password };
      await axios.post(
        "https://learningsystem-xwsq.onrender.com/api/v1/users/register",
        dataSubmit
      );
      message.success("Register successful");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      message.error(err.response.data.message);
    }
  };

  return (
    <div className="flex">
      <div className="flex-[4] h-screen">
        <img
          src="/public/login.svg"
          className="h-full w-full object-bottom object-cover"
          alt=""
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-[3] flex flex-col w-full items-center justify-center px-32 gap-5"
      >
        <h1 className="text-3xl font-semibold">Create Your Account</h1>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold">Full Name</label>
          <div className="flex gap-5">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="flex-[1]"
                  size="large"
                  placeholder="First Name"
                />
              )}
            />
            {errors.firstName && (
              <p className="text-red-600">{errors.firstName.message}</p>
            )}
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="flex-[1]"
                  size="large"
                  placeholder="Last Name"
                />
              )}
            />
            {errors.lastName && (
              <p className="text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>
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
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="flex w-full gap-5">
          <div className="flex-[1]">
            <label className="font-semibold">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder="Password"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="flex-[1]">
            <label className="font-semibold">Confirm Password</label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder="Confirm Password"
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div>
            <Button
              htmlType="submit"
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
