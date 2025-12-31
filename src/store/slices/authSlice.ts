import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import {
    customerLogin,
    customerRegister,
    customerLogout,
    getCustomerData,
    type CustomerAccessToken,
    type CustomerData
} from '../../services/shopify';

interface AuthState {
    isAuthenticated: boolean;
    customerAccessToken: string | null;
    customerAccessTokenExpiry: string | null;
    customerData: CustomerData | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    customerAccessToken: localStorage.getItem('customerAccessToken'),
    customerAccessTokenExpiry: localStorage.getItem('customerAccessTokenExpiry'),
    customerData: null,
    loading: false,
    error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const result: CustomerAccessToken = await customerLogin(email, password);

            // Store in localStorage
            localStorage.setItem('customerAccessToken', result.accessToken);
            localStorage.setItem('customerAccessTokenExpiry', result.expiresAt);

            // Fetch customer data
            const customerData = await getCustomerData(result.accessToken);

            return {
                accessToken: result.accessToken,
                expiresAt: result.expiresAt,
                customerData
            };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (
        { email, password, firstName, lastName }: {
            email: string;
            password: string;
            firstName: string;
            lastName: string
        },
        { rejectWithValue }
    ) => {
        try {
            await customerRegister(email, password, firstName, lastName);

            // Auto login after registration
            const result: CustomerAccessToken = await customerLogin(email, password);

            // Store in localStorage
            localStorage.setItem('customerAccessToken', result.accessToken);
            localStorage.setItem('customerAccessTokenExpiry', result.expiresAt);

            // Fetch customer data
            const customerData = await getCustomerData(result.accessToken);

            return {
                accessToken: result.accessToken,
                expiresAt: result.expiresAt,
                customerData
            };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Registration failed');
        }
    }
);

export const fetchCustomerData = createAsyncThunk(
    'auth/fetchCustomerData',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as { auth: AuthState };
            const token = state.auth.customerAccessToken;

            if (!token) {
                throw new Error('No access token found');
            }

            const customerData = await getCustomerData(token);
            return customerData;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch customer data');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { getState }) => {
        const state = getState() as { auth: AuthState };
        const token = state.auth.customerAccessToken;

        if (token) {
            try {
                await customerLogout(token);
            } catch (error) {
                console.error('Logout API error:', error);
            }
        }

        // Clear localStorage
        localStorage.removeItem('customerAccessToken');
        localStorage.removeItem('customerAccessTokenExpiry');
    }
);

export const checkAuthStatus = createAsyncThunk(
    'auth/checkStatus',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('customerAccessToken');
            const expiry = localStorage.getItem('customerAccessTokenExpiry');

            if (!token || !expiry) {
                throw new Error('No valid session found');
            }

            // Check if token is expired
            const expiryDate = new Date(expiry);
            if (expiryDate < new Date()) {
                localStorage.removeItem('customerAccessToken');
                localStorage.removeItem('customerAccessTokenExpiry');
                throw new Error('Session expired');
            }

            // Fetch customer data
            const customerData = await getCustomerData(token);

            return {
                accessToken: token,
                expiresAt: expiry,
                customerData
            };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Session validation failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        updateCustomerData: (state, action: PayloadAction<CustomerData>) => {
            state.customerData = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.customerAccessToken = action.payload.accessToken;
                state.customerAccessTokenExpiry = action.payload.expiresAt;
                state.customerData = action.payload.customerData;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            });

        // Register
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.customerAccessToken = action.payload.accessToken;
                state.customerAccessTokenExpiry = action.payload.expiresAt;
                state.customerData = action.payload.customerData;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            });

        // Fetch Customer Data
        builder
            .addCase(fetchCustomerData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerData.fulfilled, (state, action) => {
                state.loading = false;
                state.customerData = action.payload;
                state.error = null;
            })
            .addCase(fetchCustomerData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Logout
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.customerAccessToken = null;
                state.customerAccessTokenExpiry = null;
                state.customerData = null;
                state.loading = false;
                state.error = null;
            });

        // Check Auth Status
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.customerAccessToken = action.payload.accessToken;
                state.customerAccessTokenExpiry = action.payload.expiresAt;
                state.customerData = action.payload.customerData;
                state.error = null;
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.customerAccessToken = null;
                state.customerAccessTokenExpiry = null;
                state.customerData = null;
            });
    },
});

export const { clearError, updateCustomerData } = authSlice.actions;
export default authSlice.reducer;