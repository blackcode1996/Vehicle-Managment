import React, { useState } from "react";
import { useSelector } from "react-redux";
import { resetPassword } from "../redux/slice/profileSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.profile
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await dispatch(
      resetPassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmPassword,
      })
    );
  };

  console.log(error);

  return (
    <div className="md:ml-6 p-5 w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg border border-secondary">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid max-w-2xl mx-auto mt-8">
          <div className="items-center mt-8 sm:mt-14 text-black">
            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="currentPassword"
                className="block mb-2 text-sm font-medium"
              >
                Your current password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="*******"
                required
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="*******"
                required
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="******"
                required
              />
            </div>

            {error && (
              <p className="text-red-500">
                {typeof error === "string"
                  ? error
                  : error?.message || "An unknown error occurred."}
              </p>
            )}
            {success && (
              <p className="text-green-500">Password reset successful!</p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center bg-gradient-to-r from-primary to-secondary text-neutral p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
