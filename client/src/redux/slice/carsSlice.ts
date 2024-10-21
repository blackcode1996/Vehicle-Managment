import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLocalStorage } from '../../utils/LocalStorage';
import { userData } from './authSlice';

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
    const response = await axios.get('/api/vehicles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCar = createAsyncThunk(
  'vehicle/updateCar',
  async ({ id, updatedCarData }: { id: string; updatedCarData: Partial<VehicleData> }, { rejectWithValue }) => {
    try {
      const token = getLocalStorage('userToken') || '';
      console.log({updatedCarData});
      const response = await axios.put(`/api/vehicles/${id}`, updatedCarData, {
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
    // Add car logic
    builder
      .addCase(getVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getVehicles.fulfilled, (state, action: PayloadAction<{ data: VehicleData[] }>) => {
        state.vehicleData = action.payload.data;
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
      .addCase(updateCar.fulfilled, (state, action: PayloadAction<{ data: VehicleData }>) => {
        if (state.vehicleData) {
          const index = state.vehicleData.findIndex(car => car.id === action.payload.data.id);
          if (index !== -1) {
            state.vehicleData[index] = action.payload.data;
          }
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCar.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to update vehicle';
        state.success = false;
      });
  },
});


export const vehicleData=(state: RootState)=>state.vehicle.vehicleData;
export const vehicleLoading = (state: RootState)=> state.vehicle.loading;
export const vehicleError = (state: RootState)=>state.vehicle.error;

export default vehicleSlice.reducer;
