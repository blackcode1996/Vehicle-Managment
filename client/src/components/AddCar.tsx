import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomDropdown from "./CustomDropdown";
import { brandData } from "../redux/slice/brandSlice";
import { modelData } from "../redux/slice/modelSlice";
import { addCar, getVehicles } from "../redux/slice/carsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import ImageUpload from "./ImageUpload";
import { getShop, shopData } from "../redux/slice/shopSlice";
import { fuelTypeOptions } from "../utils/fuelType";

const AddCar = ({ onClose, vehicleDataLoading }: any) => {
  const dispatch = useAppDispatch();
  const brands: any = useSelector(brandData);
  const models: any = useSelector(modelData);
  const shop: any = useSelector(shopData);

  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [perHourCharge, setPerHourCharge] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFuelType, setSelectedFuelType] = useState<any>(null);

  useEffect(() => {
    dispatch(getShop());
  }, [dispatch]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("modelId", selectedModel.id);
    formData.append("registrationNumber", registrationNumber);
    formData.append("perHourCharge", perHourCharge);
    formData.append("fuelType", selectedFuelType?.id);
    formData.append("shopId", shop[0]?.id);

    selectedImages.forEach((image) => {
      formData.append("vehicleImg", image);
    });

    dispatch(addCar(formData)).then(() => {
      dispatch(getVehicles());
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid max-w-2xl mt-1">
        <div className="items-center mt-8 sm:mt-14 text-black">
          {/* Brand Dropdown */}
          <CustomDropdown
            label="Brand"
            items={brands}
            selectedItem={selectedBrand}
            onSelect={setSelectedBrand}
            itemImageKey="logo"
          />

          {/* Model Dropdown */}
          <CustomDropdown
            label="Model"
            items={models}
            selectedItem={selectedModel}
            onSelect={setSelectedModel}
            itemImageKey="modelImg"
          />

          {/* Fuel Type Dropdown */}
          <CustomDropdown
            label="Fuel Type"
            items={fuelTypeOptions}
            selectedItem={selectedFuelType}
            onSelect={setSelectedFuelType}
            itemImageKey="image"
          />

          {/* Registration Number */}
          <div className="m-2">
            <label
              htmlFor="registrationNumber"
              className="block mb-2 text-sm font-medium"
            >
              Registration Number
            </label>
            <input
              name="registrationNumber"
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="WB 12***"
            />
          </div>

          {/* Per Hour Charge */}
          <div className="m-2">
            <label
              htmlFor="perHourCharge"
              className="block mb-2 text-sm font-medium"
            >
              Per Hour Charge
            </label>
            <input
              name="perHourCharge"
              type="text"
              value={perHourCharge}
              onChange={(e) => setPerHourCharge(e.target.value)}
              className="bg-[#fff] border border-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Charge"
            />
          </div>

          {/* Image Upload */}
          <ImageUpload
            setSelectedImages={setSelectedImages}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
          />
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="rounded bg-primary px-4 py-3 text-sm font-medium text-neutral transition hover:scale-105"
        >
          {vehicleDataLoading ? "Adding..." : "Add Car"}
        </button>
      </div>
    </form>
  );
};

export default AddCar;
