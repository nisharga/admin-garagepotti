import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { cartSlice } from './cart/cartSlice'; // Ensure this is correctly imported
import { baseApi } from './baseApi/baseApi';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const combinedReducers = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartSlice.reducer // Access the `reducer` property of `cartSlice`
});

export const persistedReducer = persistReducer(persistConfig, combinedReducers);
