import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings, selectBookings } from "../redux/slice/bookingSlice";
import BookingCard from "./BookingsCard";

const MyBookings = () => {
  const dispatch = useDispatch();
  const allBookings = useSelector(selectBookings);

  useEffect(()=>{
    dispatch(getBookings())
  },[dispatch])

  console.log(allBookings);

  return (
    <BookingCard bookings={allBookings}/>
  );
};

export default MyBookings;
