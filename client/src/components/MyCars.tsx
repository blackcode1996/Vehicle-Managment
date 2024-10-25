import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  getVehicles,
  vehicleData,
  vehicleLoading,
  vehicleError,
} from "../redux/slice/carsSlice";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import CarSkeleton from "./Skeletons/CarSkeleton";
import { getBrands } from "../redux/slice/brandSlice";
import { getModels } from "../redux/slice/modelSlice";
import AddCar from "./AddCar";
import MyCarCard from "./VehicleCard"; 
import EditCar from "./EditCar"; 

const MyCars = () => {
  const dispatch = useAppDispatch();
  const vehicles = useSelector(vehicleData);
  const vehicleDataLoading = useSelector(vehicleLoading);
  const vehicleDataError = useSelector(vehicleError);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  useEffect(() => {
    dispatch(getVehicles());
    dispatch(getBrands());
    dispatch(getModels());
  }, [dispatch]);

  const openModalWithData = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowEditModal(true);
  };

  const closeAddModal=()=>{
    setShowAddCarModal(false)
  }


  console.log(vehicles);

  return (
    <div>
      <div className="flex justify-end mb-10">
        <button
          onClick={() => setShowAddCarModal(true)}
          className="block rounded bg-secondary px-4 py-3 text-sm font-medium text-neutral transition hover:scale-105"
        >
          Add Car
        </button>
      </div>

      {showAddCarModal && (
        <Modal onClose={() => setShowAddCarModal(false)} isOpen={showAddCarModal}>
          <AddCar onClose={closeAddModal} vehicleDataLoading={vehicleDataLoading}/>
        </Modal>
      )}

      {vehicleDataLoading && <CarSkeleton />}

      {vehicleDataError && (
        <p className="text-red-500 text-center my-4">{vehicleDataError}</p>
      )}

      {!vehicleDataLoading &&
        !vehicleDataError &&
        vehicles &&
        vehicles?.data?.map((el) => (
          <MyCarCard
            key={el.id}
            registrationNumber={el.registrationNumber}
            fuelType={el.fuelType}
            modelDetails={el.model}
            adminDetails={el.admin}
            perHourCharge={el.perHourCharge}
            vehicleImage={el.vehicleImg}
            shopDetails={el.Shop}
            bookingStatus={el.bookedStatus}
            openModalWithData={openModalWithData} 
          />
        ))}

      {showEditModal && selectedVehicle && (
        <EditCar
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          vehicle={selectedVehicle}
          vehicleDataLoading={vehicleDataLoading}
        />
      )}
    </div>
  );
};

export default MyCars;
