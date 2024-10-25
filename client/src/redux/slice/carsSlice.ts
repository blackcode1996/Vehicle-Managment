import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../utils/LocalStorage';
import axiosInstance from '../../utils/axiosInstance';

interface VehicleData {
  id: string;
  registrationNumber: string;
  perHourCharge: number;
  fuelType: string;
  vehicleImg: string[];
  model: {
    name: string;
    description: string;
    modelImg: string;
  };
  shop: {
    name: string;
    description: string;
    address: string;
  };
  admin: {
    name: string;
    email: string;
    avatar: string;
  };
}

interface VehicleState {
  vehicleData: VehicleData[] | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: VehicleState = {
  vehicleData: null,
  loading: false,
  error: null,
  success: false,
};

interface RootState {
  vehicle: VehicleState;
}

export const getVehicles = createAsyncThunk('/api/vehicles', async (_, { rejectWithValue }) => {
  try {
    const token = getLocalStorage('userToken') || '';
    console.log(token);
    const response = await axiosInstance.get('/api/vehicles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCar = createAsyncThunk(
  'vehicle/updateCar',
  async ({ id, updatedCarData }: { id: string; updatedCarData: FormData }, { rejectWithValue }) => {
    try {
      const token = getLocalStorage('userToken') || '';
      const response = await axiosInstance.put(`/api/vehicles/${id}`, updatedCarData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCar = createAsyncThunk(
  'vehicle/deleteCar',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const token = getLocalStorage('userToken') || '';
      const response = await axiosInstance.delete(`/api/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCar = createAsyncThunk(
  'vehicle/addCar',
  async (carData: FormData, { rejectWithValue }) => {
    console.log(FormData);
    try {
      const token = getLocalStorage('userToken') || '';
      const response = await axiosInstance.post('/api/vehicles', carData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch vehicles logic
    builder
      .addCase(getVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getVehicles.fulfilled, (state, action: PayloadAction<{ data: VehicleData[] }>) => {
        state.vehicleData = action.payload.vehicles;
        state.loading = false;
        state.success = true;
      })
      .addCase(getVehicles.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to fetch vehicles';
        state.success = false;
      })
      // Update car logic
      .addCase(updateCar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCar.fulfilled, (state, action: PayloadAction<VehicleData>) => {
        if (state.vehicleData) {
          const index = state.vehicleData.findIndex(car => car.id === action.payload.id);
          if (index !== -1) {
            state.vehicleData[index] = action.payload; // Update the specific vehicle in state
          }
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCar.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to update vehicle';
        state.success = false;
      })
      // Delete car logic
      .addCase(deleteCar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCar.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        if (state.vehicleData) {
          state.vehicleData = state.vehicleData.filter(car => car.id !== action.payload.id);
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteCar.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to delete vehicle';
        state.success = false;
      })
      // Add car logic
      .addCase(addCar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addCar.fulfilled, (state, action: PayloadAction<VehicleData>) => {
        if (state.vehicleData) {
          state.vehicleData.push(action.payload); 
        } else {
          state.vehicleData = [action.payload];
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(addCar.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to add vehicle';
        state.success = false;
      });
  },
});

export const vehicleData = (state: RootState) => state.vehicle.vehicleData;
export const vehicleLoading = (state: RootState) => state.vehicle.loading;
export const vehicleError = (state: RootState) => state.vehicle.error;

export default vehicleSlice.reducer;
