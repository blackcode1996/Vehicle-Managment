import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import profileSlice from './slice/profileSlice';
import shopSlice from "./slice/shopSlice";
import vehicleSlice from "./slice/carsSlice";
import brandReducer from "./slice/brandSlice";
import modelReducer from './slice/modelSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        shop: shopSlice,
        vehicle: vehicleSlice,
        brand: brandReducer,
        model: modelReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export default store;
