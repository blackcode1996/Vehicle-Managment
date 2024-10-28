import { useEffect } from 'react';
import BookingDataGrid from '../components/SellerDataGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings, selectBookings } from '../redux/slice/bookingSlice';
import { formatDate } from '../utils/formatDate';

const Seller = () => {
  const dispatch = useDispatch();
  const AllBookings = useSelector(selectBookings);

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);


  console.log("AllBookings",AllBookings);

  const formattedBookings = AllBookings.map((booking: any) => ({
    bookingId: booking.id,
    bookingFrom: formatDate(booking.bookedFrom),
    bookingTo: formatDate(booking.bookedTo),
    pickUpLocation: booking.bookingFromAddress,
    dropOffLocation: booking.bookingToAddress,
    bookingFromCoordinates: booking.bookingFromLocation,
    bookingToCoordinates: booking.bookingToLocation,
    amount: booking.totalAmount,
    hours: booking.numberOfHours,
    status: booking.status,
    userName: booking.user.name,
    email: booking.user.email,
    phone: booking.user.phone,
    vehicleId: booking.vehicle.id,
    registrationNumber: booking.vehicle.registrationNumber,
    fuelType: booking.vehicle.fuelType,
    vehicleImage: booking.vehicle.vehicleImg[0] || 'https://via.placeholder.com/150', 
  }));

  return (
    <div>
      { formattedBookings ? (
           <BookingDataGrid bookings={formattedBookings} />
      ): (
        <div>Loading...</div>
      )}
   
    </div>
  );
};

export default Seller;
