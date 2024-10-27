import { MapPin, Clock, Navigation, Car } from "lucide-react";

interface Booking {
  id: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  bookedFrom: string;
  bookedTo: string;
  bookingFromAddress: string;
  bookingToAddress: string;
  bookingFromLocation: [number, number];
  bookingToLocation: [number, number];
  vehicle: {
    registrationNumber: string;
    vehicleImg: string[];
  };
  shop: {
    name: string;
  };
  totalAmount: number;
  numberOfHours: number;
}

interface BookingCardProps {
  bookings: Booking[];
  onAddressClick?: (address: string, location: [number, number]) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ bookings, onAddressClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-middle";
      case "COMPLETED":
        return "bg-primary";
      case "CANCELLED":
        return "bg-secondary";
      default:
        return "bg-neutral";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${month} ${day}, ${year} ${hours}:${minutes}`;
  };

  const formatAddress = (address: string) => {
    return address.split(",").slice(0, 2).join(",");
  };

  const generateMapURL = (from: [number, number], to: [number, number]) => {
    return `https://maps.google.com/maps?q=${from[0]},${from[1]}&t=&z=13&ie=UTF8&iwloc=&output=embed&daddr=${to[0]},${to[1]}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-8">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={booking.vehicle?.vehicleImg[0]}
              alt={booking.vehicle?.registrationNumber}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div
              className={`absolute top-4 right-4 ${getStatusColor(
                booking.status
              )} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg`}
            >
              {booking.status}
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Car className="w-5 h-5 text-middle" />
                  <h3 className="text-xl font-semibold text-primary truncate max-w-[200px]">
                    {booking.shop.name}
                  </h3>
                </div>
                <p className="text-middle text-sm font-medium flex items-center gap-1">
                  <span className="px-2 py-0.5 bg-neutral rounded-md">
                    {booking.vehicle?.registrationNumber}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  ₹{booking.totalAmount}
                </p>
                <div className="flex items-center justify-end gap-1 text-middle mt-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{booking.numberOfHours}</span>
                  <span>hours</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div 
                className="flex items-start gap-3 p-3 hover:bg-neutral rounded-lg cursor-pointer transition-colors"
              >
                <div className="mt-1">
                  <MapPin className="w-5 h-5 text-middle" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary">From</p>
                  <p className="text-sm text-middle">
                    {formatAddress(booking.bookingFromAddress)}
                  </p>
                  <p className="text-xs text-middle mt-1">
                    {formatDate(booking.bookedFrom)}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <Navigation className="w-5 h-5 text-middle transform rotate-90" />
              </div>
              
              <div 
                className="flex items-start gap-3 p-3 hover:bg-neutral rounded-lg cursor-pointer transition-colors"
              >
                <div className="mt-1">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 text-secondary">
                  <p className="text-sm font-medium text-primary">To</p>
                  <p className="text-sm">
                    {formatAddress(booking.bookingToAddress)}
                  </p>
                  <p className="text-xs mt-1">
                    {formatDate(booking.bookedTo)}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-48 mt-4">
              <iframe
                src={generateMapURL(booking.bookingFromLocation, booking.bookingToLocation)}
                width="100%"
                height="100%"
                loading="lazy"
                className="rounded-lg shadow-md"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-primary text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md hover:shadow-lg">
                View Details
              </button>
              {booking.status === "PENDING" && (
                <button className="flex-1 bg-secondary text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md hover:shadow-lg">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingCard;
