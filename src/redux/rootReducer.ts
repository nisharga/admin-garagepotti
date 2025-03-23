import { combineReducers } from '@reduxjs/toolkit';
import { cartSlice } from './cart/cartSlice'; // Ensure correct import
import { baseApi } from './baseApi/baseApi';

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartSlice.reducer // Directly use cart reducer
});

export default rootReducer;
