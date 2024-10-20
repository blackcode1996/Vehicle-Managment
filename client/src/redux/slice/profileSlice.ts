import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLocalStorage } from '../../utils/LocalStorage';

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
}

interface ProfileState {
    userData: UserProfile | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

interface RootState {
    profile: ProfileState;
}

export const getProfile = createAsyncThunk('profile/getProfile', async (_, { rejectWithValue }) => {
    try {
        const token = getLocalStorage("userToken") || "";
        const response = await axios.get('/api/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const updateProfile = createAsyncThunk('profile/updateProfile', async (updatedData: Partial<UserProfile>, { rejectWithValue }) => {
    try {
        const token = getLocalStorage("userToken") || "";
        const response = await axios.put('/api/users/profile', updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

const initialState: ProfileState = {
    userData: null,
    loading: false,
    error: null,
    success: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        // Handle getProfile cases
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string) || action.error.message || "Get profile failed";
        });

        // Handle updateProfile cases
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.userData = action.payload;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string) || action.error.message || "Update profile failed";
        });
    },
});

export const userData = (state: RootState) => state.profile.userData;
export const userLoading = (state: RootState) => state.profile.loading;
export const userError = (state: RootState) => state.profile.error;

export const { resetState } = profileSlice.actions;

export default profileSlice.reducer;
