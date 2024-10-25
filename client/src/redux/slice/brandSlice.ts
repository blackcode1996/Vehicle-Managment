// brandSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../utils/LocalStorage';
import axiosInstance from '../../utils/axiosInstance';

export interface BrandData {
  id: string;
  name: string;
  description?: string;
}

interface BrandState {
  brandData: BrandData[] | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: BrandState = {
  brandData: null,
  loading: false,
  error: null,
  success: false,
};

export const getBrands = createAsyncThunk(
  'brand/getBrands',
  async (_, { rejectWithValue }) => {
    try {
      const token = getLocalStorage('userToken') || '';
      const response = await axiosInstance.get('/api/brand', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getBrands.fulfilled, (state, action: PayloadAction<BrandData[]>) => {
        state.brandData = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getBrands.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to fetch brands';
        state.success = false;
      });
  },
});

export const brandData = (state: { brand: BrandState }) => state.brand.brandData;
export const brandLoading = (state: { brand: BrandState }) => state.brand.loading;
export const brandError = (state: { brand: BrandState }) => state.brand.error;

export default brandSlice.reducer;
