import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState, CartItem, AddToCartPayload, UpdateQuantityPayload, RootState } from '../../types';

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
            const { product, quantity, selectedOptions } = action.payload;

            const existingItem = state.items.find(item =>
                item.product.id === product.id &&
                JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    id: Date.now(),
                    product,
                    quantity,
                    selectedOptions
                });
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },

        updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
            const { itemId, quantity } = action.payload;
            const item = state.items.find(item => item.id === itemId);
            if (item) {
                item.quantity = quantity;
            }
        },

        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;
export const selectCartTotalItems = (state: RootState): number =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state: RootState): number =>
    state.cart.items.reduce((total, item) => {
        const pricing = item.product.pricing.find(p =>
            p.quantity === item.selectedOptions.quantity &&
            p.type === item.selectedOptions.priceType
        );
        return total + (pricing ? pricing.price : 0);
    }, 0);

export default cartSlice.reducer;