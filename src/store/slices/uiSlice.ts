import { createSlice } from '@reduxjs/toolkit';

interface UIState {
    isCartOpen: boolean;
    isMobileMenuOpen: boolean;
}

const initialState: UIState = {
    isCartOpen: false,
    isMobileMenuOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openCart: state => {
            state.isCartOpen = true;
        },
        closeCart: state => {
            state.isCartOpen = false;
        },
        toggleCart: state => {
            state.isCartOpen = !state.isCartOpen;
        },
        openMobileMenu: state => {
            state.isMobileMenuOpen = true;
        },
        closeMobileMenu: state => {
            state.isMobileMenuOpen = false;
        },
        toggleMobileMenu: state => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
    },
});

export const {
    openCart,
    closeCart,
    toggleCart,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
} = uiSlice.actions;

export default uiSlice.reducer;