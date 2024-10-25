// modelSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../utils/LocalStorage';
import axiosInstance from '../../utils/axiosInstance';

export interface ModelData {
  id: string;
  name: string;
  description?: string;
  brandId: string; 
}

interface ModelState {
  modelData: ModelData[] | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ModelState = {
  modelData: null,
  loading: false,
  error: null,
  success: false,
};

export const getModels = createAsyncThunk(
  'model/getModels',
  async (_, { rejectWithValue }) => {
    try {
      const token = getLocalStorage('userToken') || '';
      const response = await axiosInstance.get('/api/model', {
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

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getModels.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getModels.fulfilled, (state, action: PayloadAction<ModelData[]>) => {
        state.modelData = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getModels.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to fetch models';
        state.success = false;
      });
  },
});

export const modelData = (state: { model: ModelState }) => state.model.modelData;
export const modelLoading = (state: { model: ModelState }) => state.model.loading;
export const modelError = (state: { model: ModelState }) => state.model.error;

export default modelSlice.reducer;
