import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Modal from './Modal';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { getStatusColor } from '../utils/getStatusColor';
import { useDispatch } from 'react-redux';
import { updateBookingStatus } from '../redux/slice/bookingSlice';
import { toast } from 'react-toastify';

const BookingDataGrid = ({ bookings }: any) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const dispatch = useDispatch();

  const handleStatusChange = (booking) => {
    if (selectedStatus[booking.bookingId] === 'ACCEPTED') {
      return toast.info("Sorry! You cannot change the status of an accepted booking");
    }

    const newStatus = selectedStatus[booking.bookingId] === 'DECLINED' ? 'ACCEPTED' : 'DECLINED';
    dispatch(updateBookingStatus({ id: booking.bookingId, decision: newStatus }));
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const openVehicleModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsVehicleModalOpen(true);
  };

  const openLocationModal = (coords) => {
    setLocationCoords({ lat: coords[0], lng: coords[1] });
    setIsLocationModalOpen(true);
  };

  const columns = useMemo(() => [
      { headerName: 'Booking ID', field: 'bookingId', sortable: true, filter: true },
      { headerName: 'Booking From (Time)', field: 'bookingFrom', sortable: true, filter: true },
      {
        headerName: 'Pick Up',
        field: 'pickUpLocation',
        cellRenderer: ({ data }) => (
          <button
            onClick={() => openLocationModal(data.bookingFromCoordinates)}
            className="text-middle underline"
          >
            View Pick Up Location
          </button>
        ),
      },
      { headerName: 'Booking To (Time)', field: 'bookingTo', sortable: true, filter: true },
      {
        headerName: 'Drop Off',
        field: 'dropOffLocation',
        cellRenderer: ({ data }) => (
          <button
            onClick={() => openLocationModal(data.bookingToCoordinates)}
            className="text-middle underline"
          >
            View Drop Off Location
          </button>
        ),
      },
      { headerName: 'Amount', field: 'amount', sortable: true, filter: true },
      { headerName: 'N.O of Hours', field: 'hours', sortable: true, filter: true },
      {
        headerName: 'Booking Status',
        field: 'status',
        cellRenderer: ({ data }) => (
          <select
            value={selectedStatus[data.bookingId] || data.status}
            onChange={(e) => {
              const newStatus = e.target.value;
              setSelectedStatus((prev) => ({ ...prev, [data.bookingId]: newStatus }));
              handleStatusChange(data);
            }}
            className={`px-3 py-1 rounded-full text-white font-medium text-sm ${getStatusColor(data.status)}`}
          >
            <option value="ACCEPTED">ACCEPTED</option>
            <option value="DECLINED">DECLINED</option>
          </select>
        ),
        sortable: true,
        filter: true,
      },
      {
        headerName: 'User Details',
        field: 'userName',
        cellRenderer: ({ data }) => (
          <button
            onClick={() => openUserModal(data)}
            className="text-middle underline"
          >
            View User Details
          </button>
        ),
      },
      {
        headerName: 'Vehicle Details',
        field: 'vehicleId',
        cellRenderer: ({ data }) => (
          <button
            onClick={() => openVehicleModal(data)}
            className="text-middle underline"
          >
            View Vehicle Details
          </button>
        ),
      },
    ], [selectedStatus]
  );

  return (
    <div className="ag-theme-material" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={bookings}
        columnDefs={columns}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
        }}
        pagination={true}
        paginationPageSize={10}
      />

      {/* User Details Modal */}
      <Modal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)}>
        {selectedUser && (
          <div>
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <p><strong>Name:</strong> {selectedUser.userName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
          </div>
        )}
      </Modal>

      {/* Vehicle Details Modal */}
      <Modal isOpen={isVehicleModalOpen} onClose={() => setIsVehicleModalOpen(false)}>
        {selectedVehicle && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
            <p><strong>Vehicle ID:</strong> {selectedVehicle.vehicleId}</p>
            <p><strong>Fuel Type:</strong> {selectedVehicle.fuelType}</p>
            <img
              src={selectedVehicle.vehicleImage}
              alt="Vehicle"
              className="w-32 h-32 object-cover rounded-lg border border-neutral shadow-md mt-4"
            />
          </div>
        )}
      </Modal>

      {/* Location Modal */}
      <Modal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)}>
        {locationCoords && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <MapContainer
              center={[locationCoords.lat, locationCoords.lng]}
              zoom={6}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[locationCoords.lat, locationCoords.lng]} />
            </MapContainer>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookingDataGrid;
