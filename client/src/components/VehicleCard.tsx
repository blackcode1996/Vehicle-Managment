import { useAppDispatch } from "../hooks/useAppDispatch";
import { deleteCar } from "../redux/slice/carsSlice";
import fuelIcon from "../assets/fuel.png";
import electricIcon from "../assets/electric.png"

interface MyCarCardProps {
  key: any;
  registrationNumber: any;
  fuelType: any;
  modelDetails: any;
  adminDetails: any;
  perHourCharge: any;
  vehicleImage: any;
  shopDetails: any;
  bookingStatus: any;
  openModalWithData: (vehicle: any) => void;
}

const MyCarCard: React.FC<MyCarCardProps> = ({
  key,
  registrationNumber,
  fuelType,
  modelDetails,
  adminDetails,
  perHourCharge,
  vehicleImage,
  shopDetails,
  bookingStatus,
  openModalWithData,
}) => {
  const dispatch = useAppDispatch();

  const deleteCarData = (id: string) => {
    dispatch(deleteCar({ id }));
  };

  console.log(fuelType);

  return (
    <div className="relative group block overflow-hidden rounded-lg shadow-lg border border-neutral">
      {/* Booking status ribbon */}
      <div className="absolute top-0 left-0 bg-secondary text-white font-bold px-2 py-2 text-xs z-10">
        {bookingStatus === "Booked" ? "BOOKED" : "AVAILABLE"}
      </div>

      {/* Vehicle image */}
      <img
        src={vehicleImage[0]}
        alt={registrationNumber}
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />

      {/* Car details section */}
      <div className="relative bg-white p-4">
        {/* Fuel type */}
        <div className="absolute top-2 right-2 flex items-center">
          <img src={fuelType == "HYBRID" || "ELECTRIC" ? electricIcon : fuelIcon} alt="Fuel Type" className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium text-gray-700">{fuelType}</span>
        </div>

        <h3 className="mt-2 text-lg font-semibold text-primary">
          {registrationNumber}
        </h3>

        <p className="mt-1 text-sm text-gray-500">{modelDetails.description}</p>

        {/* Make the "Per Hour Charge" more prominent */}
        <p className="mt-2 text-xl font-bold text-red-600">
          ₹{perHourCharge}/hour
        </p>

        {/* Action buttons */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => deleteCarData(key)}
            className="rounded bg-red-600 text-white px-4 py-2 text-sm font-medium transition hover:bg-red-700"
          >
            Delete Car
          </button>
          <button
            type="button"
            onClick={() =>
              openModalWithData({
                registrationNumber,
                fuelType,
                modelDetails,
                adminDetails,
                perHourCharge,
                vehicleImage,
                shopDetails,
                bookingStatus,
              })
            }
            className="rounded bg-blue-600 text-white px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
          >
            Edit Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCarCard;
