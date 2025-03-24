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
    getSingleMechanic: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.mechanic], 
    }),
    mechanicVerifyStatus: build.mutation({
      query: ({ id, ...data }) => { 
        console.log('my data:', data.updateData); //{adminVerificationStatus: 'pending'}
        return {
          url: `/verification/mechanic/status/${id}`,
          method: "PATCH",
          data: data.updateData,
        };
      },
      invalidatesTags: [tagTypes.mechanic],
    }),
    mechanicUpdate: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/verification/mechanic/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.mechanic],
    }),
  }),
});

export const { useGetAllMechanicQuery, 
  useMechanicVerifyStatusMutation, 
  useGetSingleMechanicQuery,
  useMechanicUpdateMutation
 } = mechanicApi;