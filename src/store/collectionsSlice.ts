import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { CollectionsState, Collection } from '..';
import {
    shopifyFetch,
    GET_COLLECTIONS_QUERY,
    GET_COLLECTION_BY_HANDLE_QUERY,
} from '../services/shopify';
import { transformShopifyCollection } from '../utils/transformers';

// ============================================
// INITIAL STATE
// ============================================

const initialState: CollectionsState = {
    items: [],
    loading: false,
    error: null,
    currentCollection: null,
};

// ============================================
// ASYNC THUNKS
// ============================================

export const fetchCollections = createAsyncThunk(
    'collections/fetchCollections',
    async (first: number = 50) => {
        const data: any = await shopifyFetch(GET_COLLECTIONS_QUERY, { first });
        return data?.collections?.edges?.map((edge: any) =>
            transformShopifyCollection(edge.node)
        );
    }
);

export const fetchCollectionByHandle = createAsyncThunk(
    'collections/fetchCollectionByHandle',
    async ({ handle, productsFirst = 100 }: { handle: string; productsFirst?: number }) => {
        const data: any = await shopifyFetch(GET_COLLECTION_BY_HANDLE_QUERY, {
            handle,
            productsFirst
        });
        if (!data.collectionByHandle) {
            throw new Error('Collection not found');
        }
        return transformShopifyCollection(data.collectionByHandle);
    }
);

// ============================================
// SLICE
// ============================================

const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        clearCurrentCollection: (state) => {
            state.currentCollection = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all collections
        builder
            .addCase(fetchCollections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCollections.fulfilled, (state, action: PayloadAction<Collection[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCollections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch collections';
            });

        // Fetch collection by handle
        builder
            .addCase(fetchCollectionByHandle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCollectionByHandle.fulfilled, (state, action: PayloadAction<Collection>) => {
                state.loading = false;
                state.currentCollection = action.payload;
            })
            .addCase(fetchCollectionByHandle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch collection';
            });
    },
});

export const { clearCurrentCollection, clearError } = collectionsSlice.actions;
export default collectionsSlice.reducer;