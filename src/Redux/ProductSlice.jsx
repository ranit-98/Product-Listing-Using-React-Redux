import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../API/AxiosInstance";

export const STATUSES = Object.freeze({
  IDEL: "idel",
  ERROR: "error",
  LOADING: "loading",
});

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  //const res = await axios.get(`https://dummyjson.com/products`);
  const res=await axiosInstance.get('products')
  return res?.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDEL,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDEL;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default  productSlice.reducer ;


// Memoized selector to get products from the state
export const selectProducts = createSelector(
  (state) => state.products.data,
  (data) => data?.products // Directly returning the data array
);

// Selector to get status from the state
export const selectStatus = (state) => state.products.status || null;