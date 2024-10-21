import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import profileSlice from './slice/profileSlice';
import shopSlice from "./slice/shopSlice";
import vehicleSlice from "./slice/carsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice, 
        shop: shopSlice,
        vehicle: vehicleSlice
    },
});

export type AppDispatch = typeof store.dispatch;

export default store;
