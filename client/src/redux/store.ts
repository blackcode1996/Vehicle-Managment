import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import profileSlice from './slice/profileSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice, 
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;
