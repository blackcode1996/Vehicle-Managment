import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import profileSlice from './slice/profileSlice';
import shopSlice from "./slice/shopSlice";
import vehicleSlice from "./slice/carsSlice";
import brandReducer from "./slice/brandSlice";
import modelReducer from './slice/modelSlice';
import filterReducer from './slice/filterSortSlice';
import bookingReducer from './slice/bookingSlice';


const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        shop: shopSlice,
        vehicle: vehicleSlice,
        brand: brandReducer,
        model: modelReducer,
        filter: filterReducer,
        booking: bookingReducer
    },
});

export type AppDispatch = typeof store.dispatch;

export default store;
