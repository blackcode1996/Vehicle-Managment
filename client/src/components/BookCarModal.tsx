import { useState, useEffect } from "react";
import CustomDatePicker from "./DatePicker";
import CustomDropdown from "./CustomDropdown";
import { locations } from "../utils/location";
import { useDispatch, useSelector } from "react-redux";
import {
  bookVehicle,
  selectBookingError,
  selectBookingStatus,
} from "../redux/slice/bookingSlice";
import { getLocalStorage } from "../utils/LocalStorage";
import { toast } from "react-toastify";

const BookCarModal = ({ vehicle }:{vehicle: any}) => {
  const [selectedPickupLocation, setSelectedPickupLocation] =
    useState<any>(null);
  const [selectedDropoffLocation, setSelectedDropoffLocation] =
    useState<any>(null);
  const [bookedFrom, setBookedFrom] = useState(null);
  const [bookedTo, setBookedTo] = useState(null);

  const bookingLoading = useSelector(selectBookingStatus);

  const dispatch = useDispatch();
  const user = getLocalStorage("user");

  const handleBookCar = () => {
    if (
      !bookedFrom ||
      !bookedTo ||
      !selectedPickupLocation ||
      !selectedDropoffLocation
    ) {
      toast.info("Please fill all the details before submitting!");
      return;
    }

    const bookingData = {
      vehicleId: vehicle.vehicleId,
      userId: user.user.id,
      bookedFrom: bookedFrom.toISOString(),
      bookedTo: bookedTo.toISOString(),
      bookingFromLocation: selectedPickupLocation.coordinates,
      bookingToLocation: selectedDropoffLocation.coordinates,
    };

    dispatch(bookVehicle(bookingData));
  };


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleBookCar();
      }}
    >
      <div className="grid max-w-2xl mt-1">
        <div className="items-center mt-8 sm:mt-14 text-black">
          <div className="m-2 relative z-50">
            <CustomDropdown
              label="Pick-up Location"
              items={locations}
              selectedItem={selectedPickupLocation}
              onSelect={setSelectedPickupLocation}
              itemImageKey="modelImg"
            />
          </div>

          <div className="m-2 relative z-40">
            <CustomDropdown
              label="Drop Location"
              items={locations}
              selectedItem={selectedDropoffLocation}
              onSelect={setSelectedDropoffLocation}
              itemImageKey="modelImg"
            />
          </div>

          <div className="m-2 relative z-30">
            <label className="block mb-2 text-sm font-bold">Booking From</label>
            <CustomDatePicker
              selectedDate={bookedFrom || new Date()}
              setSelectedDate={setBookedFrom}
            />
          </div>

          {bookedFrom && (
            <div className="m-2 relative z-20">
              <label className="block mb-2 text-sm font-bold">Booking To</label>
              <CustomDatePicker
                selectedDate={bookedTo || new Date()}
                setSelectedDate={setBookedTo}
                minDate={bookedFrom}
              />
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className={`rounded bg-primary px-4 py-3 text-sm font-medium text-neutral transition hover:scale-105 ${
                bookingLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={bookingLoading}
            >
              {bookingLoading ? "Booking..." : "Book Car"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookCarModal;
