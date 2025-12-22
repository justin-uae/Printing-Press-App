import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UIState, Product } from '../../types';

const initialState: UIState = {
    isMobileMenuOpen: false,
    isCartOpen: false,
    isQuickViewOpen: false,
    quickViewProduct: null
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        closeMobileMenu: (state) => {
            state.isMobileMenuOpen = false;
        },
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        closeCart: (state) => {
            state.isCartOpen = false;
        },
        openQuickView: (state, action: PayloadAction<Product>) => {
            state.isQuickViewOpen = true;
            state.quickViewProduct = action.payload;
        },
        closeQuickView: (state) => {
            state.isQuickViewOpen = false;
            state.quickViewProduct = null;
        }
    }
});

export const {
    toggleMobileMenu,
    closeMobileMenu,
    toggleCart,
    closeCart,
    openQuickView,
    closeQuickView
} = uiSlice.actions;

export default uiSlice.reducer;