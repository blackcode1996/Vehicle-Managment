const ResetPassword = () => {
  return (
    <div className="md:ml-6 p-5 w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg border border-secondary">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl">Reset Password</h2>
      <div className="grid max-w-2xl mx-auto mt-8">
        <div className="items-center mt-8 sm:mt-14 text-black">
          <div className="mb-2 sm:mb-6">
            <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium">
              Your current password
            </label>

            <input
              type="password"
              id="name"
              className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="*******"
              required
            />
          </div>

          <div className="mb-2 sm:mb-6">
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="*******"
              required
            />
          </div>

          <div className="mb-2 sm:mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="******"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full flex justify-center bg-gradient-to-r from-primary to-secondary text-neutral p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
