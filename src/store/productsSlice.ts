import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import {
    shopifyFetch,
    GET_PRODUCTS_QUERY,
    GET_PRODUCT_BY_HANDLE_QUERY,
    GET_FEATURED_PRODUCTS_QUERY,
    SEARCH_PRODUCTS_QUERY,
} from '../services/shopify';
import { transformShopifyProduct } from '../utils/transformers';
import type { Product, ProductsState } from '..';

// ============================================
// INITIAL STATE
// ============================================

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    currentProduct: null,
    featuredProducts: [],
};

// ============================================
// ASYNC THUNKS
// ============================================

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ first = 100, query }: { first?: number; query?: string } = {}) => {
        
        const data: any = await shopifyFetch(GET_PRODUCTS_QUERY, { first, query });
        return data.products.edges.map((edge: any) => transformShopifyProduct(edge.node));
    }
);

export const fetchProductByHandle = createAsyncThunk(
    'products/fetchProductByHandle',
    async (handle: string) => {
        const data: any = await shopifyFetch(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
        if (!data.productByHandle) {
            throw new Error('Product not found');
        }
        return transformShopifyProduct(data.productByHandle);
    }
);

export const fetchFeaturedProducts = createAsyncThunk(
    'products/fetchFeaturedProducts',
    async (first: number = 12) => {
        const data: any = await shopifyFetch(GET_FEATURED_PRODUCTS_QUERY, { first });
        if (!data.collection || !data.collection.products) {
            return [];
        }
        return data.collection.products.edges.map((edge: any) =>
            transformShopifyProduct(edge.node)
        );
    }
);

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async ({ query, first = 50 }: { query: string; first?: number }) => {
        const data: any = await shopifyFetch(SEARCH_PRODUCTS_QUERY, { query, first });
        return data.products.edges.map((edge: any) => transformShopifyProduct(edge.node));
    }
);

// ============================================
// SLICE
// ============================================

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all products
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });

        // Fetch product by handle
        builder
            .addCase(fetchProductByHandle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductByHandle.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductByHandle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch product';
            });

        // Fetch featured products
        builder
            .addCase(fetchFeaturedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.featuredProducts = action.payload;
            })
            .addCase(fetchFeaturedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch featured products';
            });

        // Search products
        builder
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search products';
            });
    },
});

export const { clearCurrentProduct, clearError } = productsSlice.actions;
export default productsSlice.reducer;