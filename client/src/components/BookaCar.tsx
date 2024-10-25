import { useEffect, useState } from "react";
import AnimatedSvgBackground from "./AnimatedSvgBackground";
import { useSelector } from "react-redux";
import { getModels, modelData } from "../redux/slice/modelSlice";
import CustomDropdown from "./CustomDropdown";
import delhi from "../assets/delhi.webp";
import kolkata from "../assets/kolkata.webp";
import Bengaluru from "../assets/bangalore.webp";
import Mumbai from "../assets/mumbai.webp";
import Goa from "../assets/goa.jpg";
import { useAppDispatch } from "../hooks/useAppDispatch";

const BookaCar = () => {
  const models: any = useSelector(modelData);
  const dispatch = useAppDispatch();
  const [selectedModel, setSelectedModel] = useState<any>(null);

  const locations = [
    { id: "delhi", name: "Delhi", modelImg: delhi },
    { id: "kolkata", name: "Kolkata", modelImg: kolkata },
    { id: "bengaluru", name: "Bengaluru", modelImg: Bengaluru },
    { id: "mumbai", name: "Mumbai", modelImg: Mumbai },
    { id: "goa", name: "Goa", modelImg: Goa },
  ];

  const [selectedPickupLocation, setSelectedPickupLocation] =
    useState<any>(null);
  const [selectedDropoffLocation, setSelectedDropoffLocation] =
    useState<any>(null);

  useEffect(() => {
    dispatch(getModels());
  }, [dispatch]);

  return (
    <section
      id="booking-section"
      className="relative bg p-16"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* SVG Background */}
      <AnimatedSvgBackground />

      <div className="container mx-auto relative z-10">
        <div className="bg-neutral p-16 shadow-xl rounded-lg relative z-20 text-primary">
          <h2 className="text-3xl font-bold mb-6 text-secondary">
            Book your car
          </h2>

          <p className="error-message hidden bg-red-100 text-red-700 p-4 rounded-lg flex justify-between items-center">
            All fields required!{" "}
            <i className="fa-solid fa-xmark cursor-pointer"></i>
          </p>

          <p className="booking-done hidden bg-green-100 text-green-700 p-4 rounded-lg flex justify-between items-center">
            Check your email to confirm an order.
            <i className="fa-solid fa-xmark cursor-pointer"></i>
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CustomDropdown
              label="Model"
              items={models}
              selectedItem={selectedModel}
              onSelect={setSelectedModel}
              itemImageKey="modelImg"
            />

            <CustomDropdown
              label="Pick-up Location"
              items={locations}
              selectedItem={selectedPickupLocation}
              onSelect={setSelectedPickupLocation}
              itemImageKey="modelImg"
            />

            <CustomDropdown
              label="Drop-off Location"
              items={locations}
              selectedItem={selectedDropoffLocation}
              onSelect={setSelectedDropoffLocation}
              itemImageKey="modelImg"
            />

            <div className="flex flex-col">
              <label className="text-base font-semibold mb-2 flex items-center">
                <i className="fa-regular fa-calendar-days text-secondary mr-2"></i>{" "}
                Pick-up <b className="text-secondary">*</b>
              </label>
              <input
                type="date"
                className="p-2 border border-secondary rounded-lg text-primary"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-base font-semibold mb-2 flex items-center">
                <i className="fa-regular fa-calendar-days text-secondary mr-2"></i>{" "}
                Drop-off <b className="text-secondary">*</b>
              </label>
              <input
                type="date"
                className="p-2 border border-secondary rounded-lg text-primary"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="py-4 px-6 bg-secondary text-white rounded-lg shadow-lg hover:shadow-2xl transition-all"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookaCar;
