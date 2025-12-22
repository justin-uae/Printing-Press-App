import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import collectionsReducer from './collectionsSlice';
import cartReducer from './slices/cartSlice';
import filterReducer from './slices/filterSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        collections: collectionsReducer,
        cart: cartReducer,
        filter: filterReducer,
        ui: uiReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;