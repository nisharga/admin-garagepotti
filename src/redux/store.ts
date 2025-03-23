 
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Assuming rootReducer exists
import { baseApi } from './baseApi/baseApi';

export const store = configureStore({
    reducer: rootReducer, // No need for `as any`
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
