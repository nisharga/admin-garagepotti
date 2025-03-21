/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi } from '@reduxjs/toolkit/query/react';
import { tagTypesList } from './tagType';
import { axiosBaseQuery } from './axiosBaseQuery';

// Backend HomeRoute
export const getBaseUrl = (): string => {
    return (
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        ''
    );
};

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
    endpoints: (builder) => ({
        //all points will injects here..
    }),
    tagTypes: tagTypesList
});
