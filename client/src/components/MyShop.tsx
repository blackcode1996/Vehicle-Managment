import ShopImg from  "../assets/shopImg.jpg"

const MyShop = () => {
  return (
    <div className="md:ml-6 p-5 w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg border border-secondary">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl">Shop Details</h2>
      <form>
        <div className="grid max-w-2xl mx-auto mt-8">
          <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            <img
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-secondary m-auto"
              src={ShopImg}
              alt="Avatar"
            />
          </div>

          <div className="items-center mt-8 sm:mt-14 text-black">
            {/* Name Field */}
            <div className="mb-2 sm:mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Shop Name
              </label>
              <input
                name="name"
                type="text"
                className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="John Doe's Shop"
              />
            </div>

            {/* Email Field */}
            <div className="mb-2 sm:mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Shop Address
              </label>
              <input
                name="address"
                type="text"
                className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="123 Main St, City, Country"
              />
            </div>

            <div className="mb-2 sm:mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Shop Description
              </label>
              <textarea
                name="description"
                className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="....."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`w-full flex justify-center bg-gradient-to-r from-primary to-secondary text-neutral p-4 rounded-full tracking-wide font-semibold shadow-lg transition-all duration-300 ease-in-out hover:scale-105`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyShop;
