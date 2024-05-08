import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
        removeCartItem: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
    },
});

export const { addToCart, removeCartItem } = cartSlice.actions; 
export default cartSlice.reducer;
