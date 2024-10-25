import { useState, useEffect } from "react";
import Modal from "./Modal";
import ImageUpload from "./ImageUpload";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { updateCar, getVehicles } from "../redux/slice/carsSlice";

interface EditCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: any;
  vehicleDataLoading: boolean
}

const EditCarModal: React.FC<EditCarModalProps> = ({ isOpen, onClose, vehicle,vehicleDataLoading }) => {
  const dispatch = useAppDispatch();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    registrationNumber: "",
    perHourCharge: "",
    fuelType: "",
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        registrationNumber: vehicle.registrationNumber,
        perHourCharge: vehicle.perHourCharge.toString(),
        fuelType: vehicle.fuelType,
      });
    }
  }, [vehicle]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hasChanges = () => {
    return (
      JSON.stringify(formData) !==
        JSON.stringify({
          registrationNumber: vehicle.registrationNumber,
          perHourCharge: vehicle.perHourCharge.toString(),
          fuelType: vehicle.fuelType,
        }) || selectedImages.length
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges() || !vehicle.id) return;

    const updatedFormData = new FormData();
    updatedFormData.append("registrationNumber", formData.registrationNumber);
    updatedFormData.append("perHourCharge", formData.perHourCharge);
    updatedFormData.append("fuelType", formData.fuelType);
    selectedImages.forEach((image) => {
      updatedFormData.append("vehicleImg", image);
    });

    dispatch(
      updateCar({ id: vehicle.id, updatedCarData: updatedFormData })
    ).then(() => {
      dispatch(getVehicles());
      onClose(); 
    });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
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
                className="rounded bg-primary px-4 py-3 text-sm font-medium text-neutral transition hover:scale-105"
              >
                {vehicleDataLoading ? "Updating..." :"Update Car"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditCarModal;
