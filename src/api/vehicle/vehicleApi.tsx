import { baseApi } from "@/redux/baseApi/baseApi"; 
import { tagTypes } from "@/redux/baseApi/tagType";

const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({ 
    createVehicle: build.mutation({
      query: (data) => { 
        return {
          url: "/vehicle",
          method: "POST",
          data: data,
        }
      },
      invalidatesTags: [tagTypes.vehicle],
    }),
    getAllVehicle: build.query({
      query: () => ({
        url: `/vehicle`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.vehicle], 
    }), 
    /* 
    getSingleService: build.query({
      query: (id) => ({
        url: `/service/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.service], 
    }), 
    updateSingleService: build.mutation({
      query: ({ id, ...data }) => {  
        console.log(data);
        console.log(id);
        return {
          url: `/service/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.service],
    }),
    deleteSingleService: build.mutation({
      query: (id) => ({
        url: `/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],  
    }), */
  }),
});

export const { 
  useCreateVehicleMutation,
  useGetAllVehicleQuery
 } = servicesApi;