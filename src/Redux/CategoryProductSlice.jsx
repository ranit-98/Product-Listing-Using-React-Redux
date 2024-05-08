import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../API/AxiosInstance';

export const STATUSES = {
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error',
};

export const fetchCategoryProducts = createAsyncThunk('categoryProducts/fetch', async (category) => {
    //const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    const response = await axiosInstance.get(`products/category/${category}`);
    return response.data.products;
});

const categoryProductsSlice = createSlice({
    name: 'categoryProducts',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryProducts.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchCategoryProducts.rejected, (state) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export default categoryProductsSlice.reducer;

// Create selectors
export const selectCategoryProducts = (state) => state.categoryProducts.data || [];
export const selectCategoryStatus = (state) => state.categoryProducts.status || null;
