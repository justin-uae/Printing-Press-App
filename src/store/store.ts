import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import filterReducer from './slices/filterSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        filter: filterReducer,
        ui: uiReducer
    }
});

export default store;