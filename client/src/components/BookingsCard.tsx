import { MapPin, Clock, Navigation, Car } from "lucide-react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { formatDate } from "../utils/formatDate";
import { formatAddress } from "../utils/formatAddress";
import { getStatusColor } from "../utils/getStatusColor";
import { Icon } from "leaflet";

interface Booking {
  id: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELLED";
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

const BookingCard: React.FC<BookingCardProps> = ({ bookings }) => {
  const primaryIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

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
              <div className="flex items-start gap-3 p-3">
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

              <div className="flex items-start gap-3 p-3">
                <div className="mt-1">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 text-secondary">
                  <p className="text-sm font-medium text-primary">To</p>
                  <p className="text-sm">
                    {formatAddress(booking.bookingToAddress)}
                  </p>
                  <p className="text-xs mt-1">{formatDate(booking.bookedTo)}</p>
                </div>
              </div>

              <MapContainer
                center={booking.bookingFromLocation}
                zoom={4}
                style={{ height: "200px", width: "100%" }}
                scrollWheelZoom={false}
                className="rounded-lg shadow-md"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={booking.bookingFromLocation}
                  icon={primaryIcon}
                />
                <Marker
                  position={booking.bookingToLocation}
                  icon={primaryIcon}
                />
                <Polyline
                  positions={[
                    booking.bookingFromLocation,
                    booking.bookingToLocation,
                  ]}
                  color="blue"
                  weight={5}
                  opacity={0.7}
                />
              </MapContainer>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingCard;
