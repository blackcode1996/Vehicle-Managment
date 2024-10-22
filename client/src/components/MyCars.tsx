import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  getVehicles,
  vehicleData,
  updateCar,
  deleteCar,
  vehicleLoading,
  vehicleError,
} from "../redux/slice/carsSlice";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import ImageUpload from "./ImageUpload";
import CarSkeleton from "./Skeletons/CarSkeleton";

const MyCars = () => {
  const dispatch = useAppDispatch();
  const vehicles = useSelector(vehicleData);
  const vehicleDataLoading = useSelector(vehicleLoading);
  const vehicleDataError = useSelector(vehicleError);
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    registrationNumber: "",
    perHourCharge: "",
    fuelType: "",
  });
  const [originalData, setOriginalData] = useState<any>(null);
  const [currentVehicleId, setCurrentVehicleId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  const openModalWithData = (vehicle: any) => {
    setFormData({
      registrationNumber: vehicle.registrationNumber,
      perHourCharge: vehicle.perHourCharge.toString(),
      fuelType: vehicle.fuelType,
    });
    setOriginalData(vehicle);
    setCurrentVehicleId(vehicle.id);
    setShowModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hasChanges = () => {
    return (
      JSON.stringify(formData) !==
        JSON.stringify({
          registrationNumber: originalData?.registrationNumber,
          perHourCharge: originalData?.perHourCharge.toString(),
          fuelType: originalData?.fuelType,
        }) || selectedImages.length
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges() || !currentVehicleId) return;

    const updatedFormData = new FormData();
    updatedFormData.append("registrationNumber", formData.registrationNumber);
    updatedFormData.append("perHourCharge", formData.perHourCharge);
    updatedFormData.append("fuelType", formData.fuelType);
    selectedImages.forEach((image) => {
      updatedFormData.append("vehicleImg", image);
    });

    dispatch(
      updateCar({ id: currentVehicleId, updatedCarData: updatedFormData })
    ).then(() => {
      dispatch(getVehicles()); // Fetch updated vehicles after edit
    });

    setShowModal(false);
  };

  const deleteCarData = (id: string) => {
    dispatch(deleteCar({ id: id }));
  };

  return (
    <div>
      {vehicleDataLoading && <CarSkeleton />}

      {vehicleDataError && (
        <p className="text-red-500 text-center my-4">{vehicleDataError}</p>
      )}

      {!vehicleDataLoading &&
        !vehicleDataError &&
        vehicles &&
        vehicles.map((el) => (
          <div className="group relative block overflow-hidden" key={el.id}>
            <img
              src={el.vehicleImg[0]}
              alt={el.registrationNumber}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />
            <div className="relative border border-primary bg-white p-6">
              <p className="text-primary">{`Per Hour Charge ₹${el.perHourCharge}`}</p>
              <h3 className="mt-1.5 text-lg font-medium text-primary">
                {el.registrationNumber}
              </h3>
              <p className="mt-1.5 line-clamp-3 text-primary">
                {el.model.description}
              </p>
              <form className="mt-4 flex gap-4">
                <button
                  onClick={() => deleteCarData(el.id)}
                  className="block w-full rounded bg-secondary px-4 py-3 text-sm font-medium text-neutral transition hover:scale-105"
                >
                  Delete Car
                </button>
                <button
                  type="button"
                  className="block w-full rounded bg-primary px-4 py-3 text-sm font-medium text-neutral transition hover:scale-105"
                  onClick={() => openModalWithData(el)}
                >
                  Edit Car
                </button>
              </form>
            </div>
          </div>
        ))}

      {showModal && (
        <Modal onClose={() => setShowModal(false)} isOpen={showModal}>
          <form onSubmit={handleSubmit}>
            <div className="grid max-w-2xl mt-1">
              <div className="items-center mt-8 sm:mt-14 text-black">
                <div className="m-2">
                  <label
                    htmlFor="registrationNumber"
                    className="block mb-2 text-sm font-medium"
                  >
                    Registration Number
                  </label>
                  <input
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleFormChange}
                    type="text"
                    className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    placeholder="WB 12***"
                  />
                </div>

                <div className="m-2">
                  <label
                    htmlFor="perHourCharge"
                    className="block mb-2 text-sm font-medium"
                  >
                    Per Hour Charge
                  </label>

                  <input
                    name="perHourCharge"
                    value={formData.perHourCharge}
                    onChange={handleFormChange}
                    type="number"
                    className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    placeholder="200"
                  />
                </div>

                <div className="m-2 mb-5">
                  <label
                    htmlFor="fuelType"
                    className="block mb-2 text-sm font-medium"
                  >
                    Fuel Type
                  </label>
                  <input
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleFormChange}
                    type="text"
                    className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    placeholder="PETROL"
                    autoCapitalize="on"
                  />
                </div>

                {/* Image Upload */}
                <ImageUpload
                  setSelectedImages={setSelectedImages}
                  imagePreviews={imagePreviews}
                  setImagePreviews={setImagePreviews}
                />

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className={`w-full flex justify-center bg-gradient-to-r from-primary to-secondary text-neutral p-4 rounded-full tracking-wide font-semibold shadow-lg transition-all duration-300 ease-in-out hover:scale-105 ${
                      !hasChanges() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!hasChanges()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MyCars;
