import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getVehicles,
  vehicleData,
  vehicleError,
  vehicleLoading,
} from "../redux/slice/carsSlice";
import { getModels, modelData, modelError, modelLoading } from "../redux/slice/modelSlice";
import { brandData, brandError, brandLoading, getBrands } from "../redux/slice/brandSlice";
import MyCarCard from "../components/VehicleCard";
import Pagination from "../components/Pagination";
import DatePicker from "../components/DatePicker";
import Dropdown from "../components/CustomDropdown";
import PriceRangeSlider from "../components/Slider";

const Vehicles = () => {
  const dispatch = useAppDispatch();

  const vehicles: any = useSelector(vehicleData);
  const vehicleDataLoading = useSelector(vehicleLoading);
  const vehicleDataError = useSelector(vehicleError);


  const brands = useSelector(brandData);
  const brandsDataLoading = useSelector(brandLoading);
  const brandsDataError = useSelector(brandError);

  const models = useSelector(modelData);
  const modelsDataLoading = useSelector(modelLoading);
  const modelDataError = useSelector(modelError);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  console.log(selectedBrand);
  console.log(selectedModel);

useEffect(() => {
    dispatch(getVehicles({}));
    dispatch(getBrands());
    dispatch(getModels());
  }, [dispatch]);

  const handleBrandSelect = (brand: any) => setSelectedBrand(brand);
  const handleModelSelect = (model: any) => setSelectedModel(model);

  if (vehicleDataLoading) return <p>Loading vehicles...</p>;
  if (vehicleDataError)
    return <p>Error fetching vehicles: {vehicleDataError}</p>;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row mt-4">
        {/* Filter Section (aside) */}
        <aside className="w-full md:w-1/4 p-4">
          <div className="sticky top-12 flex flex-col gap-2 p-4 text-sm border-r border-secondary">
            <h2 className="text-lg font-bold mb-4">Filters</h2>

            {/* Brand Dropdown */}
            <Dropdown
              label="Brand"
              items={brands}
              selectedItem={selectedBrand}
              onSelect={handleBrandSelect}
              loading={brandsDataLoading}
              error={brandsDataError}
              itemImageKey="logo"
            />

            {/* Model Dropdown */}
            <Dropdown
              label="Model"
              items={models}
              selectedItem={selectedModel}
              onSelect={handleModelSelect}
              loading={modelsDataLoading}
              error={modelDataError}
              itemImageKey="modelImg"
            />

            {/* Date Pickers */}
            <div className="flex gap-4 w-full justify-between mt-4">
              <div>
                <h3 className="font-semibold">From</h3>
                <DatePicker />
              </div>
              <div>
                <h3 className="font-semibold">To</h3>
                <DatePicker />
              </div>
            </div>

            {/* Price Range */}
            <PriceRangeSlider/>
          </div>
        </aside>

        {/* Main Content Section */}
        <main className="flex-grow p-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {vehicles?.data?.map((vehicle: any) => (
              <MyCarCard
                key={vehicle.id}
                registrationNumber={vehicle.registrationNumber}
                fuelType={vehicle.fuelType}
                modelDetails={vehicle.model}
                adminDetails={vehicle.admin}
                perHourCharge={vehicle.perHourCharge}
                vehicleImage={vehicle.vehicleImg}
                shopDetails={vehicle.Shop}
                bookingStatus={vehicle.bookedStatus}
                deleteEditButton={false}
              />
            ))}
          </div>
        </main>
      </div>

      <Pagination
        currentPage={vehicles?.currentPage}
        totalPages={vehicles?.totalPages}
      />
    </div>
  );
};

export default Vehicles;
