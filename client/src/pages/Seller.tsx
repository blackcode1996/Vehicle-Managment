import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getBookings, selectBookings } from "../redux/slice/bookingSlice";

const Seller = () => {
  
  const dispath = useDispatch();

  const sellerBookings= useSelector(selectBookings);

  useEffect(()=>{
    dispath(getBookings());
  },[dispath])

  console.log(sellerBookings);

  return (
    <div>
      Ssajhshjsa
    </div>
  )
}

export default Seller
