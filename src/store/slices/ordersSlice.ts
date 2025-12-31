import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getCustomerOrders, getOrderById, type Order } from '../../services/shopify';
import type { RootState } from '../store';

interface OrdersState {
    orders: Order[];
    currentOrder: Order | null;
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
}

const initialState: OrdersState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    lastFetched: null,
};

// Async Thunks
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (limit: number = 50, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.auth.customerAccessToken;

            if (!token) {
                throw new Error('No access token found. Please log in.');
            }

            const orders = await getCustomerOrders(token, limit);
            return orders;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch orders');
        }
    }
);

export const fetchOrderById = createAsyncThunk(
    'orders/fetchOrderById',
    async (orderId: string, { rejectWithValue }) => {
        try {
            const order = await getOrderById(orderId);

            if (!order) {
                throw new Error('Order not found');
            }

            return order;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch order');
        }
    }
);

export const refreshOrders = createAsyncThunk(
    'orders/refreshOrders',
    async (_, { dispatch }) => {
        // Clear existing orders and fetch fresh data
        dispatch(clearOrders());
        return dispatch(fetchOrders(50));
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.orders = [];
            state.currentOrder = null;
            state.error = null;
            state.lastFetched = null;
        },
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        },
        clearOrdersError: (state) => {
            state.error = null;
        },
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
            state.lastFetched = Date.now();
        },
    },
    extraReducers: (builder) => {
        // Fetch Orders
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.error = null;
                state.lastFetched = Date.now();
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Order By ID
        builder
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
                state.error = null;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Refresh Orders
        builder
            .addCase(refreshOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshOrders.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(refreshOrders.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to refresh orders';
            });
    },
});

// Selectors
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectCurrentOrder = (state: RootState) => state.orders.currentOrder;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const selectOrdersError = (state: RootState) => state.orders.error;
export const selectLastFetched = (state: RootState) => state.orders.lastFetched;

// Filter selectors
export const selectPendingOrders = (state: RootState) =>
    state.orders.orders.filter(
        (order) =>
            order.status?.toLowerCase().includes('unfulfilled') ||
            order.status?.toLowerCase().includes('pending')
    );

export const selectFulfilledOrders = (state: RootState) =>
    state.orders.orders.filter((order) =>
        order.status?.toLowerCase().includes('fulfilled')
    );

export const selectCancelledOrders = (state: RootState) =>
    state.orders.orders.filter(
        (order) =>
            order.status?.toLowerCase().includes('cancelled') ||
            order.status?.toLowerCase().includes('refunded')
    );

// Get order by ID from state
export const selectOrderByNumber = (orderNumber: number) => (state: RootState) =>
    state.orders.orders.find((order) => order.orderNumber === orderNumber);

// Statistics selectors
export const selectOrdersStats = (state: RootState) => {
    const orders = state.orders.orders;

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(
        (order) =>
            order.status?.toLowerCase().includes('unfulfilled') ||
            order.status?.toLowerCase().includes('pending')
    ).length;
    const fulfilledOrders = orders.filter((order) =>
        order.status?.toLowerCase().includes('fulfilled')
    ).length;
    const cancelledOrders = orders.filter(
        (order) =>
            order.status?.toLowerCase().includes('cancelled') ||
            order.status?.toLowerCase().includes('refunded')
    ).length;

    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

    return {
        totalOrders,
        pendingOrders,
        fulfilledOrders,
        cancelledOrders,
        totalSpent,
        averageOrderValue,
    };
};

export const {
    clearOrders,
    clearCurrentOrder,
    clearOrdersError,
    setOrders
} = ordersSlice.actions;

export default ordersSlice.reducer;