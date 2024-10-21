import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getVehicles, vehicleData } from "../redux/slice/carsSlice";
import { useSelector } from "react-redux";

const MyCars = () => {
  const dispatch = useAppDispatch();

  const vehicle = useSelector(vehicleData);

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  console.log(vehicle);

  return (
    <div>
      {vehicle &&
        vehicle.map((el) => (
          <a href="#" className="group relative block overflow-hidden">
            <img
              src={el.vehicleImg[0]}
              alt=""
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border border-primary bg-white p-6">
              <p className="text-primary">
                {`Per Hour Charge ₹${el.perHourCharge}`}
              </p>

              <h3 className="mt-1.5 text-lg font-medium text-primary">
                {el.registrationNumber}
              </h3>

              <p className="mt-1.5 line-clamp-3 text-primary">
                {el.model.description}
              </p>

              <form className="mt-4 flex gap-4">
                <button className="block w-full rounded bg-secondary px-4 py-3 text-sm font-medium text-neutral transition hover:scale-105">
                  Delete Car
                </button>

                <button
                  type="button"
                  className="block w-full rounded bg-primary px-4 py-3 text-sm font-medium text-neutral transition hover:scale-105"
                >
                  Update Car
                </button>
              </form>
            </div>
          </a>
        ))}
    </div>
  );
};

export default MyCars;
