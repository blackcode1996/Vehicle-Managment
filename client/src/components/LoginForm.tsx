import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  loginUser,
  userData,
  userError,
  userLoading,
} from "../redux/slice/authSlice";
import { LoginValidationRules } from "../utils/Validation";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoading = useSelector(userLoading);
  const isError = useSelector(userError);
  const usersData = useSelector(userData);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationRules,
    onSubmit: async (values) => {
      const userData = {
        email: values.email,
        password: values.password,
      };

      dispatch(loginUser(userData));
    },
  });

  useEffect(() => {
    if (!isLoading && !isError && usersData) {
      const role = usersData?.role;
      if (role === "CUSTOMER") {
        navigate("/vehicles");
      } else if (role === "ADMIN") {
        navigate("/seller");
      }
    }
  }, [isLoading, isError, usersData, navigate]);

  return (
    <div className="h-screen flex overflow-hidden bg-neutral">
      <div className="w-full relative flex">
        <svg
          viewBox="0 0 400 150"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="myGradient" gradientTransform="rotate(90)">
              <stop offset="5%" stopColor="#dc2626" />
              <stop offset="95%" stopColor="#e0c3fc" />
            </linearGradient>
          </defs>
          <path
            d="M208.09,0.00 C152.70,67.10 262.02,75.98 200.80,150.00 L0.00,150.00 L0.00,0.00 Z"
            fill="url(#myGradient)"
          />
        </svg>

        <div className="absolute top-0 p-8 flex justify-between w-full items-center z-10">
          <h1 className="text-3xl text-primary uppercase font-bold">Caring</h1>
          <Link to="/register">
            <button className="border-2 bg-neutral text-secondary p-2 hover:bg-primary hover:text-white rounded transition duration-500 ease-in-out font-medium cursor-pointer">
              Registration
            </button>
          </Link>
        </div>

        <form
          className="absolute inset-0 flex flex-col items-center justify-center px-8"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-5xl text-primary font-bold mb-8">Welcome Back</h1>
          <input
            className="py-2 px-4 border rounded mt-4 text-primary placeholder-primary w-full max-w-md focus:outline-none focus:ring focus:ring-secondary"
            type="email"
            placeholder="Type your email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
          <input
            className="py-2 px-4 border rounded mt-4 placeholder-primary text-primary w-full max-w-md focus:outline-none focus:ring focus:ring-secondary"
            type="password"
            placeholder="Type your password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}

          <button
            type="submit"
            className="border-2 bg-secondary p-2 text-white hover:bg-primary hover:text-secondary rounded transition duration-500 ease-in-out font-bold mt-4 uppercase w-full max-w-md"
          >
            {isLoading ? "Logging in..." : "Login In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
