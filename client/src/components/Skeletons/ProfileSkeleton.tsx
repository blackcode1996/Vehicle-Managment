const ProfileSkeleton = () => {
  return (
    <div className="md:ml-6 p-5 w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg animate-pulse">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl bg-gray-300 h-8 w-40 mb-4"></h2>

      <div className="flex flex-col items-center sm:flex-row sm:space-y-0">
        <div className="object-cover w-40 h-40 bg-secondary rounded-full"></div>
        <div className="flex flex-col space-y-5 sm:ml-8">
          <div className="py-3.5 px-7 text-base font-medium bg-secondary rounded-lg h-10 w-36"></div>
          <div className="py-3.5 px-7 text-base font-medium bg-primary rounded-lg h-10 w-36"></div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div className="h-6 bg-secondary rounded-md"></div>
        <div className="h-6 bg-secondary rounded-md"></div>
        <div className="h-6 bg-secondary rounded-md"></div>
        <div className="h-6 bg-secondary rounded-md"></div>
      </div>

      <div className="mt-10 flex justify-end">
        <div className="w-full bg-secondary p-4 rounded-full h-12"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
