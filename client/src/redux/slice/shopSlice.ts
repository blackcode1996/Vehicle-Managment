import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../../utils/LocalStorage";
import axiosInstance from "../../utils/axiosInstance";

interface Shop {
  id: string;
  name: string;
  description: string;
  address: string;
  userId: string;
}

interface ShopState {
  data: Shop[];
  totalShops: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ShopState = {
  data: [],
  totalShops: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
  success: false,
};

interface RootState {
  shop: ShopState;
}

// Async thunk to get shop data
export const getShop = createAsyncThunk(
  "shop/getShop",
  async (_, { rejectWithValue }) => {
    try {
      const token = getLocalStorage("userToken") || "";
      const response = await axiosInstance.get('/api/shop', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.shops;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk to update shop data
export const updateShop = createAsyncThunk(
  "shop/updateShop",
  async ({ shopId, shopData }: { shopId: string; shopData: Omit<Shop, 'id' | 'userId'> }, { rejectWithValue }) => {
    try {
      const token = getLocalStorage("userToken") || "";
      const response = await axiosInstance.put(`/api/shop/${shopId}`, shopData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get shop cases
    builder
      .addCase(getShop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getShop.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data || [];
        state.totalShops = action.payload?.totalShops || 0;
        state.totalPages = action.payload?.totalPages || 0;
        state.currentPage = action.payload?.currentPage || 1;
        state.success = true;
      })
      .addCase(getShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    // Update shop cases
    builder
      .addCase(updateShop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((shop) => shop.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload }; 
        }
        state.success = true;
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const shopData = (state: RootState) => state.shop.data;
export const shopLoading = (state: RootState) => state.shop.loading;
export const shopError = (state: RootState) => state.shop.error;

export default shopSlice.reducer;
