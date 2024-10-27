import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getVehicles,
  vehicleData,
  vehicleError,
  vehicleLoading,
} from "../redux/slice/carsSlice";
import {
  getModels,
  modelData,
  modelError,
  modelLoading,
} from "../redux/slice/modelSlice";
import {
  brandData,
  brandError,
  brandLoading,
  getBrands,
} from "../redux/slice/brandSlice";
import MyCarCard from "../components/VehicleCard";
import Pagination from "../components/Pagination";
import Dropdown from "../components/CustomDropdown";
import DatePicker from "../components/DatePicker";
import { fuelTypeOptions } from "../utils/fuelType";
import { sortOptions } from "../utils/sortType";
import VehiclePageSkeleton from "../components/Skeletons/vehiclePageSkeleton";
import Modal from "../components/Modal";
import BookCarModal from "../components/BookCarModal";

const Vehicles = () => {
  const dispatch = useAppDispatch();
  const vehicles = useSelector<any>(vehicleData);
  const vehicleDataLoading = useSelector(vehicleLoading);
  const vehicleDataError = useSelector(vehicleError);

  const brands = useSelector(brandData);
  const brandsDataLoading = useSelector(brandLoading);
  const brandsDataError = useSelector(brandError);

  const models = useSelector(modelData);
  const modelsDataLoading = useSelector(modelLoading);
  const modelDataError = useSelector(modelError);

  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<any>(null);
  const [selectedSortOption, setSelectedSortOption] = useState<any>(null);
  const [openBookModal, setOpenBookModal] = useState<any>(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getModels());
    handleResetFilters();
  }, [dispatch]);

  const handleApplyFilters = () => {
    dispatch(
      getVehicles({
        page: currentPage,
        limit: itemsPerPage,
        brand: selectedBrand?.name || "",
        model: selectedModel?.name || "",
        fuelType: selectedFuelType?.name || "",
        sortField: selectedSortOption?.field,
        sortOrder: selectedSortOption?.order,
      })
    );
  };

  const handleResetFilters = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedFuelType(null);
    setSelectedSortOption(null);
    setCurrentPage(1);
    dispatch(
      getVehicles({
        page: 1,
        limit: itemsPerPage,
        brand: "",
        model: "",
        fuelType: "",
        sortField: "perHourCharge",
        sortOrder: "asc",
      })
    );
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
    dispatch(
      getVehicles({
        page,
        limit: itemsPerPage,
        brand: selectedBrand?.name || "",
        model: selectedModel?.name || "",
        fuelType: selectedFuelType?.name || "",
        sortField: selectedSortOption?.field,
        sortOrder: selectedSortOption?.order,
      })
    );
  };

  const handleSort = (sortOption: any) => {
    setSelectedSortOption(sortOption);
    dispatch(
      getVehicles({
        page: currentPage,
        limit: itemsPerPage,
        brand: selectedBrand?.name || "",
        model: selectedModel?.name || "",
        fuelType: selectedFuelType?.name || "",
        sortField: sortOption?.field || "perHourCharge",
        sortOrder: sortOption?.order || "asc",
      })
    );
  };

  const openModalWithData = (data: any) => {
    console.log(data);
    setSelectedVehicle(data);
    setOpenBookModal(true);

  };


  if (vehicleDataLoading) return <VehiclePageSkeleton />;
  if (vehicleDataError)
    return <p>Error fetching vehicles: {vehicleDataError}</p>;

  return (
    <div className="p-4 min-h-screen">
      <div className="flex flex-col md:flex-row gap-2">
        <aside className="text-primary bg-neutral w-full p-4 rounded-lg border-b-4 border-r-4 border-secondary sticky top-4 self-start shadow-lg h-full">
          <div className="flex flex-col gap-6 text-sm">
            <h2 className="text-lg font-bold">Filters</h2>
            <Dropdown
              label="Brand"
              items={brands}
              selectedItem={selectedBrand}
              onSelect={setSelectedBrand}
              loading={brandsDataLoading}
              error={brandsDataError}
              itemImageKey="logo"
            />
            <Dropdown
              label="Model"
              items={models}
              selectedItem={selectedModel}
              onSelect={setSelectedModel}
              loading={modelsDataLoading}
              error={modelDataError}
              itemImageKey="modelImg"
            />
            <Dropdown
              label="Fuel Type"
              items={fuelTypeOptions}
              selectedItem={selectedFuelType}
              onSelect={setSelectedFuelType}
              loading={false}
              error={false}
              itemImageKey="image"
            />
            <div className="flex gap-2 w-full justify-between items-center mt-1">
              <div className="w-full">
                <h3 className="font-semibold mb-1">From</h3>
                <DatePicker />
              </div>
              <div className="w-full">
                <h3 className="font-semibold mb-1">To</h3>
                <DatePicker />
              </div>
            </div>
            <button
              onClick={handleApplyFilters}
              className="rounded bg-secondary text-white px-4 py-2 text-sm font-medium transition hover:bg-primary w-full"
            >
              Apply Filters
            </button>
            <button
              onClick={handleResetFilters}
              className="rounded bg-neutral text-primary border border-secondary px-4 py-2 text-sm font-medium transition w-full"
            >
              Reset Filters
            </button>
          </div>
        </aside>
        <main className="flex-grow p-4 bg-gray-50 rounded-lg shadow-md">
          <div className="flex justify-end mb-2">
            <div className="w-max">
              <Dropdown
                label="Sort By"
                items={sortOptions}
                selectedItem={selectedSortOption}
                onSelect={handleSort}
                loading={false}
                error={false}
                itemImageKey="label"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles &&
              vehicles?.vehicles.data?.map((vehicle: any) => (
                <MyCarCard
                  key={vehicle.id}
                  vehicleId = {vehicle.id}
                  registrationNumber={vehicle.registrationNumber}
                  fuelType={vehicle.fuelType}
                  modelDetails={vehicle.model}
                  adminDetails={vehicle.admin}
                  perHourCharge={vehicle.perHourCharge}
                  vehicleImage={vehicle.vehicleImg}
                  shopDetails={vehicle.Shop}
                  bookingStatus={vehicle.bookedStatus}
                  deleteEditButton={false}
                  openModalWithData={openModalWithData}
                />
              ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={vehicles?.vehicles.totalPages}
            onPageChange={handlePagination}
          />
        </main>
      </div>
      {openBookModal && (
        <Modal isOpen={openBookModal} onClose={() => setOpenBookModal(false)}>
          <BookCarModal
            vehicle={selectedVehicle}
          />
        </Modal>
      )}
    </div>
  );
};

export default Vehicles;
