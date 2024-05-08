import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../API/AxiosInstance";

export const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
  });
  

export const fetchCategories = createAsyncThunk("category/fetch", async () => {
   // const res = await axios.get(`https://dummyjson.com/products/categories`);
    const res = await axiosInstance.get(`products/categories`);
    return res?.data;
  });
  
  const categorySlice = createSlice({
    name: "category",
    initialState: {
      data: [],
      status: STATUSES.IDEL,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategories.pending, (state) => {
            state.status = STATUSES.LOADING;
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
          })
          .addCase(fetchCategories.rejected, (state) => {
            state.status = STATUSES.ERROR;
          });
      },
      
  });
 
  export default categorySlice.reducer;

  // Memoized selector for categories data
  export const selectCategories = createSelector(
    (state) => state?.categories?.data || [],
    (data) => data
);


  // Selector for the category status
  export const selectCategoryStatus = (state) => state?.category?.status || null;
