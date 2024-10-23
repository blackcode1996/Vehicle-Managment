import VehicelCard from "../components/VehicleCard";
//import VehicleCardSkeleton from "../components/Skeletons/VehicleCardSkeleton";
import Pagination from "../components/Pagination";
import DatePicker from "../components/DatePicker";

const Vehicles = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row mt-4">
        <aside className="w-full md:w-1/4 p-4 border-r md:border-b-0 lg:border-gray-500 md:border-r-0 md:pr-4">
          <h2 className="text-lg font-bold mb-4">Filters</h2>

          <div className="mb-4">
            <h3 className="font-semibold">Category</h3>
            <select className="border rounded w-full p-1">
              <option value="">All Categories</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
            </select>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Stock</h3>
            <select className="border rounded w-full p-1">
              <option value="">All Items</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Brand</h3>
            <select className="border rounded w-full p-1">
              <option value="">All Brands</option>
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
            </select>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Rating</h3>
            <select className="border rounded w-full p-1">
              <option value="">All Ratings</option>
              <option value="4">4 stars & above</option>
              <option value="3">3 stars & above</option>
            </select>
          </div>

          <div className="flex gap-4 w-full justify-between">
            <div>
            <h3 className="font-semibold">From</h3>
              <DatePicker />
            </div>

            <div>
            <h3 className="font-semibold">To</h3>
              <DatePicker />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Price Range</h3>
            <input
              type="range"
              max={"100000"}
              className="border rounded w-full p-1 mb-2"
            />
            <p>Price: $0 - $100000</p>
          </div>
        </aside>

        <main className="flex-grow p-4">
          <div className="flex items-center justify-end mb-4">
            <select className="border rounded w-full md:w-1/4 p-1">
              <option value="asc">Sort by Price: Low to High</option>
              <option value="desc">Sort by Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {/* {Array.from({ length: 6 }).map((_, index) => (
              <VehicleCardSkeleton key={index} />
            ))} */}
            {/* Example of using ProductCard */}
            <VehicelCard
              productId="123"
              productImage="/path/to/image"
              productPrice={20000}
              productDiscountPercent={10}
              productTitle="Toyota Corolla"
              productRating={4.5}
              productActualPrice={22000}
            />
          </div>
        </main>
      </div>

      <Pagination currentPage={1} totalPages={10} />
    </div>
  );
};

export default Vehicles;
