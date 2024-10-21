
const ShopSkeleton = () => {
  return (
    <div className="md:ml-6 p-10 w-full pb-8 mt-8 sm:max-w-xl sm:rounded-lg animate-pulse">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl bg-primary h-6 w-1/3 rounded mb-8"></h2>

      <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0 mt-4">
        {/* Skeleton for Shop Image */}
        <div className="bg-secondary object-cover w-40 h-40 p-1 rounded-full"></div>
      </div>

      <div className="items-center mt-8 sm:mt-14 text-black">
        {/* Skeleton for Name Field */}
        <div className="mb-2 sm:mb-6">
          <label className="block mb-2 text-sm font-medium bg-primary h-4 w-24 rounded"></label>
          <div className="bg-gray-300 border text-sm rounded-lg w-full h-10"></div>
        </div>

        {/* Skeleton for Address Field */}
        <div className="mb-2 sm:mb-6">
          <label className="block mb-2 text-sm font-medium bg-primary h-4 w-24 rounded"></label>
          <div className="bg-gray-300 border text-sm rounded-lg w-full h-10"></div>
        </div>

        {/* Skeleton for Description Field */}
        <div className="mb-2 sm:mb-6">
          <label className="block mb-2 text-sm font-medium bg-primary h-4 w-24 rounded"></label>
          <div className="bg-gray-300 border text-sm rounded-lg w-full h-20"></div>
        </div>

        {/* Skeleton for Button */}
        <div className="flex justify-end">
          <div className="bg-secondary w-full h-12 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ShopSkeleton;
