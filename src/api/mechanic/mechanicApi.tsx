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
    mechanicVerifyStatus: build.mutation({
      query: ({id, ...data}) => ({
        url: `/verification/mechanic/status/${id}`,
        method: "PATCH", 
        data: data,
      }),
      invalidatesTags: [tagTypes.mechanic],
    }),
  }),
});

export const { useGetAllMechanicQuery, useMechanicVerifyStatusMutation } = mechanicApi;