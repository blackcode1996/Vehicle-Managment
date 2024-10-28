import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings, selectBookings } from "../redux/slice/bookingSlice";
import BookingCard from "./BookingsCard";
import { Link } from "react-router-dom";


const MyBookings = () => {
  const dispatch = useDispatch();
  const allBookings = useSelector(selectBookings);

  useEffect(()=>{
    dispatch(getBookings())
  },[dispatch])

  console.log(allBookings);

  return (

    allBookings.length ? (
      <BookingCard bookings={allBookings}/>
    ):(
      <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <div className="relative animate-bounce">
        <svg
          className="emoji-404"
          enable-background="new 0 0 226 249.135"
          height="249.135"
          id="Layer_1"
          overflow="visible"
          version="1.1"
          viewBox="0 0 226 249.135"
          width="226"
        >
          <circle cx="113" cy="113" fill="#FFE585" r="109" />
          <line
            enable-background="new"
            fill="none"
            opacity="0.29"
            stroke="#6E6E96"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="8"
            x1="88.866"
            x2="136.866"
            y1="245.135"
            y2="245.135"
          />
          <line
            enable-background="new"
            fill="none"
            opacity="0.17"
            stroke="#6E6E96"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="8"
            x1="154.732"
            x2="168.732"
            y1="245.135"
            y2="245.135"
          />
          <line
            enable-background="new"
            fill="none"
            opacity="0.17"
            stroke="#6E6E96"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="8"
            x1="69.732"
            x2="58.732"
            y1="245.135"
            y2="245.135"
          />
          <circle cx="68.732" cy="93" fill="#6E6E96" r="9" />
          <circle cx="156.398" cy="93" fill="#6E6E96" r="9" />
          <ellipse
            cx="67.732"
            cy="140.894"
            enable-background="new"
            fill="#FF0000"
            opacity="0.18"
            rx="17.372"
            ry="8.106"
          />
          <ellipse
            cx="154.88"
            cy="140.894"
            enable-background="new"
            fill="#FF0000"
            opacity="0.18"
            rx="17.371"
            ry="8.106"
          />
          <path
            d="M13,118.5C13,61.338,59.338,15,116.5,15c55.922,0,101.477,44.353,103.427,99.797  c0.044-1.261,0.073-2.525,0.073-3.797C220,50.802,171.199,2,111,2S2,50.802,2,111c0,50.111,33.818,92.318,79.876,105.06  C41.743,201.814,13,163.518,13,118.5z"
            fill="#FFEFB5"
          />
          <circle
            cx="113"
            cy="113"
            fill="none"
            r="109"
            stroke="#6E6E96"
            stroke-width="8"
          />
        </svg>
      </div>

      <div className="tracking-widest mt-4 text-center">
        <span className="text-gray-500 text-xl">
          Sorry, No Booking found!
        </span>
      </div>

      <div className="mt-6">
        <Link
          to="/vehicles"
          className="w-full flex justify-center bg-gradient-to-r from-primary to-secondary text-neutral p-6 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          Browse Cars
        </Link>
      </div>
    </div>
    )
   
  );
};

export default MyBookings;
