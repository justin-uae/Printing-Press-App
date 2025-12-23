import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductVariant } from '../../';

// Cart Item interface
export interface CartItem {
    id: string;
    product: Product;
    variant: ProductVariant;
    variantId: string; // Shopify variant GID
    quantity: number;
    selectedOptions: {
        priceType: 'online' | 'normal';
        turnaroundType?: 'normal' | 'express';
    };
}

// Cart State interface
interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{
                product: Product;
                variant: ProductVariant;
                quantity: number;
                priceType: 'online' | 'normal';
                turnaroundType?: 'normal' | 'express';
            }>
        ) => {
            const { product, variant, quantity, priceType, turnaroundType } = action.payload;

            // Create unique ID based on product, variant, and options
            const itemId = `${product.id}-${variant.id}-${priceType}-${turnaroundType || 'normal'}`;

            // Check if item already exists in cart
            const existingItem = state.items.find(item => item.id === itemId);

            if (existingItem) {
                // Update quantity if item exists
                existingItem.quantity += quantity;
            } else {
                // Add new item to cart
                state.items.push({
                    id: itemId,
                    product,
                    variant,
                    variantId: variant.id, // Shopify variant GID
                    quantity,
                    selectedOptions: {
                        priceType,
                        turnaroundType,
                    },
                });
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },

        updateQuantity: (
            state,
            action: PayloadAction<{ itemId: string; quantity: number }>
        ) => {
            const { itemId, quantity } = action.payload;
            const item = state.items.find(item => item.id === itemId);

            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },

        clearCart: state => {
            state.items = [];
        },
    },
});

// Actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors (use any for RootState to avoid circular dependency)
export const selectCartItems = (state: any): CartItem[] => state.cart?.items || [];

export const selectCartTotalItems = (state: any): number => {
    return state.cart?.items.reduce((total: number, item: CartItem) => total + item.quantity, 0) || 0;
};

export const selectCartTotalPrice = (state: any): number => {
    return (
        state.cart?.items.reduce((total: number, item: CartItem) => {
            const price =
                item.selectedOptions.priceType === 'online'
                    ? item.variant.price
                    : item.variant.compareAtPrice || item.variant.price;
            return total + price * item.quantity;
        }, 0) || 0
    );
};

export default cartSlice.reducer;