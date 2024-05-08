import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../API/AxiosInstance';

// Define the loading and error states
export const STATUSES = {
    LOADING: 'loading',
    ERROR: 'error',
    SUCCESS: 'success',
};

// Create an async thunk for fetching product details by product ID
export const fetchProductDetails = createAsyncThunk(
    'productDetails/fetchProductDetails',
    async (id) => {
        //const response = await axios.get(`https://dummyjson.com/products/${id}`);
        const response = await axiosInstance.get(`products/${id}`);
        return response.data;
    }
);

// Create the product details slice
const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: {
        product: null,
        status: STATUSES.LOADING,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetails.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.product = action.payload;
                state.status = STATUSES.SUCCESS;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = STATUSES.ERROR;
            });
    },
});

// Export the product details reducer
export default productDetailsSlice.reducer;

// Export selectors
export const selectProductDetails = (state) => state.productDetails.product;
export const selectProductStatus = (state) => state.productDetails.status;
export const selectProductError = (state) => state.productDetails.error;
