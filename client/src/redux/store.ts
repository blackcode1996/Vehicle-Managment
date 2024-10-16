import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice
    }
})

export type AppDispatch = typeof store.dispatch;

export default store;