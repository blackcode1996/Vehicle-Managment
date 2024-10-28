import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationValidationSchema } from "../utils/Validation";
import {
  registerUser,
  userData,
  userError,
  userLoading,
} from "../redux/slice/authSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { removeLocalStorage, setLocalStorage } from "../utils/LocalStorage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const RegistrationForm = ({
  resgisterAsSeller,
}: {
  resgisterAsSeller: boolean;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(userLoading);
  const isError = useSelector(userError);
  const usersData = useSelector(userData);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegistrationValidationSchema,
    onSubmit: (values) => {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: resgisterAsSeller ? "ADMIN" : "CUSTOMER",
      };
      dispatch(registerUser(userData));
    },
  });

  useEffect(() => {
    if (!isLoading && !isError && usersData) {
      setLocalStorage("user", usersData);
      removeLocalStorage("regsiterAsSeller");
      navigate("/verifyEmail");
    }
  }, [isLoading, isError, usersData, navigate]);


  return (
    <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
      <div className="relative">
        <label className="ml-3 text-sm font-bold text-primary tracking-wide">
          Name
        </label>
        <input
          className={`w-full text-base px-4 py-2 border-b ${
            formik.touched.name && formik.errors.name
              ? "border-red-500"
              : "border-primary"
          } focus:outline-none rounded-2xl focus:border-secondary`}
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="John Doe"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-secondary text-sm">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="relative">
        <label className="ml-3 text-sm font-bold text-primary tracking-wide">
          Email
        </label>
        <input
          className={`w-full text-base px-4 py-2 border-b ${
            formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-primary"
          } focus:outline-none rounded-2xl focus:border-secondary`}
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="mail@gmail.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-secondary text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="mt-8">
        <label className="ml-3 text-sm font-bold text-primary tracking-wide">
          Password
        </label>
        <input
          className={`w-full text-base px-4 py-2 border-b ${
            formik.touched.password && formik.errors.password
              ? "border-red-500"
              : "border-primary"
          } focus:outline-none rounded-2xl focus:border-secondary`}
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter your password"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-secondary text-sm">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="mt-8">
        <label className="ml-3 text-sm font-bold text-primary tracking-wide">
          Confirm Password
        </label>
        <input
          className={`w-full text-base px-4 py-2 border-b ${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "border-red-500"
              : "border-primary"
          } focus:outline-none rounded-2xl focus:border-secondary`}
          type="password"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          placeholder="Confirm your password"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-secondary text-sm">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <Link to="/" className="text-secondary hover:text-primary">
            Forgot your password?
          </Link>
        </div>
      </div>
      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full flex justify-center bg-gradient-to-r from-primary to-secondary text-neutral p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </div>
      <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
        <span>Alraedy registered?</span>
        <Link
          to="/login"
          className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
