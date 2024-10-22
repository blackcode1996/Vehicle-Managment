const CarSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="grid">
        {/* Card Skeleton */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="group relative block overflow-hidden border border-primary rounded-md shadow-lg"
          >
            {/* Image skeleton */}
            <div className="h-64 w-full bg-secondary sm:h-72" />

            {/* Content skeleton */}
            <div className="relative p-6 bg-neutral">
              {/* Price skeleton */}
              <div className="h-4 w-32 bg-primary mb-2 rounded"></div>

              {/* Registration Number skeleton */}
              <div className="h-6 w-40 bg-primary mb-2 rounded"></div>

              {/* Description skeleton */}
              <div className="h-4 w-64 bg-primary mb-2 rounded"></div>
              <div className="h-4 w-64 bg-primary mb-2 rounded"></div>
              <div className="h-4 w-64 bg-primary mb-2 rounded"></div>

              {/* Buttons skeleton */}
              <div className="flex gap-4 mt-4">
                <div className="h-10 w-full bg-primary rounded"></div>
                <div className="h-10 w-full bg-secondary rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarSkeleton;
