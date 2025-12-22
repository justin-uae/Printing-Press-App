import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FilterState } from '../../types';

const initialState: FilterState = {
    selectedCategory: null,
    searchTerm: '',
    priceRange: [0, 5000],
    sortBy: 'featured'
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setPriceRange: (state, action: PayloadAction<[number, number]>) => {
            state.priceRange = action.payload;
        },
        setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
            state.sortBy = action.payload;
        },
        resetFilters: (state) => {
            state.selectedCategory = null;
            state.searchTerm = '';
            state.priceRange = [0, 5000];
            state.sortBy = 'featured';
        }
    }
});

export const {
    setSelectedCategory,
    setSearchTerm,
    setPriceRange,
    setSortBy,
    resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;