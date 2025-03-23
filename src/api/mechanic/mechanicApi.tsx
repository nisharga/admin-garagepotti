import { baseApi } from "@/redux/baseApi/baseApi"; 
import { tagTypes } from "@/redux/baseApi/tagType";

const mechanicApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMechanic: build.query({
      query: () => ({
        url: `/user/all/mechanic`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.mechanic],
    }),
  }),
});

export const { useGetAllMechanicQuery } = mechanicApi;