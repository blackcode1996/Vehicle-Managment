import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { clearLocalStorage, setLocalStorage } from '../../utils/LocalStorage';

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  token?: string; 
}

interface AuthState {
  user: null | User;
  loading: boolean;
  error: null | string;
}

interface RootState {
  auth: AuthState;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { name: string; email: string; password: string; role: string }) => {
    const response = await axiosInstance.post('/api/auth/register', userData);
    setLocalStorage("user", response.data.data);
    return response.data; 
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: { email: string; password: string }) => {
    const response = await axiosInstance.post('/api/auth/login', userData);
    setLocalStorage("userToken", response.data.data.token);
    setLocalStorage("user",response.data.data)
    return response.data; 
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state)=>{
      state.user = null;
      state.loading = false;
      state.error = null;
      clearLocalStorage();
    }
  },
  extraReducers: (builder) => {
    // Registration cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed'; 
      })
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...action.payload.data.user, token: action.payload.data.token }; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed'; 
      });
  },
});

export const userData = (state: RootState) => state.auth.user;
export const userToken = (state: RootState) => state.auth.user?.token; 
export const userError = (state: RootState) => state.auth.error;
export const userLoading = (state: RootState) => state.auth.loading;

export const { logout } = authSlice.actions;  

export default authSlice.reducer;
