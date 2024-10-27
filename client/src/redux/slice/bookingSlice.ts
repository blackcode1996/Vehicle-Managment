import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { getLocalStorage } from '../../utils/LocalStorage';

interface BookingRequest {
  vehicleId: string;
  userId: string;
  bookedFrom: string; 
  bookedTo: string;
  bookingFromLocation: [number, number];
  bookingToLocation: [number, number];
}

interface BookingResponse {
  id: string;
  vehicleId: string;
  userId: string;
  bookedFrom: string;
  bookedTo: string;
  bookingFromLocation: [number, number];
  bookingToLocation: [number, number];
}

interface BookingState {
  booking: BookingResponse | null;
  bookings: BookingResponse[]; 
  status: boolean;
  error: string | null;
}

interface RootState {
  booking: BookingState;
}

const initialState: BookingState = {
  booking: null,
  bookings: [], 
  status: false,
  error: null,
};


export const bookVehicle = createAsyncThunk<BookingResponse, BookingRequest, { rejectValue: string }>(
  'booking/bookVehicle',
  async (bookingData, { rejectWithValue }) => {
    try {
      const token = getLocalStorage('userToken') || '';
      const response = await axiosInstance.post<BookingResponse>(
        '/api/booking/create',
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Booking failed');
    }
  }
);


export const getBookings = createAsyncThunk<BookingResponse[], void, { rejectValue: string }>(
  'booking/getBookings',
  async (_, { rejectWithValue }) => {
    try {
      const token = getLocalStorage('userToken') || '';
      const response = await axiosInstance.get<BookingResponse[]>('/api/booking', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch bookings');
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // postBookings
    builder
      .addCase(bookVehicle.pending, (state) => {
        state.status = true;
        state.error = null;
      })
      .addCase(bookVehicle.fulfilled, (state, action: PayloadAction<BookingResponse>) => {
        state.status = false;
        state.booking = action.payload;
      })
      .addCase(bookVehicle.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload || 'Unknown error';
      })
      //getBookings 
      .addCase(getBookings.pending, (state) => {
        state.status = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action: PayloadAction<BookingResponse[]>) => {
        state.status = false;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const selectBooking = (state: RootState) => state.booking.booking;
export const selectBookings = (state: RootState) => state.booking.bookings;

export const selectBookingStatus = (state: RootState) => state.booking.status;
export const selectBookingError = (state: RootState) => state.booking.error;

export default bookingSlice.reducer;
