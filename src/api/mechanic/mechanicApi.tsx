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
      query: ({ id, adminVerificationStatus }) => ({
        url: `/verification/mechanic/status/${id}`,
        method: "PATCH", 
        body: { adminVerificationStatus }, // Corrected from `data` to `body`
      }),
      invalidatesTags: [tagTypes.mechanic], // Refresh cache after mutation
    }),
  }),
});

export const { useGetAllMechanicQuery, useMechanicVerifyStatusMutation } = mechanicApi;