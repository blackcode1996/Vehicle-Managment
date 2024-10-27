
const VehiclePageSkeleton = () => {
  return (
    <div className="p-4 min-h-screen animate-pulse">
      <div className="flex flex-col md:flex-row gap-2">
        
        {/* Sidebar Filters Skeleton */}
        <aside className="text-primary bg-neutral w-full md:w-1/4 lg:w-2.5/5 p-4 rounded-lg border-b-4 border-r-4 border-secondary shadow-lg h-full z-50">
          <div className="flex flex-col gap-6 text-sm">
            <div className="h-5 w-1/3 bg-primary rounded mb-4"></div>
            <div className="h-10 w-full bg-neutral rounded mb-2"></div>
            <div className="h-10 w-full bg-neutral rounded mb-2"></div>
            <div className="h-10 w-full bg-neutral rounded mb-2"></div>
            <div className="flex gap-2 w-full justify-between items-center mt-1">
              <div className="h-10 w-full bg-neutral rounded mb-2"></div>
              <div className="h-10 w-full bg-neutral rounded mb-2"></div>
            </div>
            <div className="h-10 w-full bg-secondary rounded mb-2"></div>
            <div className="h-10 w-full bg-neutral rounded"></div>
          </div>
        </aside>
        
        {/* Main Content Skeleton */}
        <main className="flex-grow p-4 bg-gray-50 rounded-lg shadow-md">
          <div className="flex justify-end mb-2">
            <div className="h-10 w-1/3 bg-neutral rounded"></div>
          </div>
          
          {/* Vehicles Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-lg shadow-lg border border-neutral"
              >
                <div className="h-40 bg-neutral rounded mb-4"></div>
                <div className="h-5 w-1/2 bg-primary rounded mb-2"></div>
                <div className="h-5 w-1/3 bg-secondary rounded mb-2"></div>
                <div className="h-5 w-full bg-neutral rounded mb-2"></div>
                <div className="h-5 w-full bg-neutral rounded"></div>
              </div>
            ))}
          </div>
          
          {/* Pagination Skeleton */}
          <div className="flex justify-center mt-6">
            <div className="h-8 w-1/4 bg-neutral rounded"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VehiclePageSkeleton;
