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
  status?: "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELLED"; 
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


export const updateBookingStatus = createAsyncThunk<
  BookingResponse,
  { id: string; decision: "ACCEPTED" | "DECLINED" },
  { rejectValue: string }
>(
  'booking/updateBookingStatus',
  async ({ id, decision }, { rejectWithValue }) => {
    try {
      const token = getLocalStorage('userToken') || '';
      const response = await axiosInstance.patch<BookingResponse>(
        `/api/booking/${id}/decision`,
        { decision },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update booking status');
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // bookVehicle
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
      // getBookings
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
      })
      // updateBookingStatus
      .addCase(updateBookingStatus.pending, (state) => {
        state.status = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action: PayloadAction<BookingResponse>) => {
        state.status = false;
        state.booking = action.payload;
        const updatedBookingIndex = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (updatedBookingIndex >= 0) {
          state.bookings[updatedBookingIndex] = action.payload;
        }
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
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
