import { baseApiSlice } from "@/store/baseApiSlice";

export const leavesApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaves: builder.query({
      query: (params) => ({
        url: "/leaves",
        params,
      }),
      providesTags: [{ type: "Leave", id: "LIST" }],
    }),

    getLeavesWithPagination: builder.query({
      query: (args) => {
        const { page, search, limit } = args;
        const checkedLimit = limit === 0 || limit === "" ? 6 : limit;

        if (search !== "") {
          return `/leaves/advanced?page=${page}&limit=${checkedLimit}&search=${search}`;
        } else {
          return `/leaves/advanced?page=${page}&limit=${checkedLimit}`;
        }
      },
      providesTags: [{ type: "Leave", id: "LIST" }],
    }),

    getLeave: builder.query({
      query: (id) => `/leaves/${id}`,
      providesTags: [{ type: "Leave", id: "LIST" }],
    }),

    createLeave: builder.mutation({
      query: (body) => ({
        url: "/leaves",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Leave", id: "LIST" }],
    }),

    updateLeave: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/leaves/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Leave", id: "LIST" }],
    }),

    deleteLeave: builder.mutation({
      query: (id) => ({
        url: `/leaves/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Leave", id: "LIST" }],
    }),

    approveLeave: builder.mutation({
      query: (id) => ({
        url: `/leaves/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Leave", id: "LIST" }],
    }),

    deleteLeaves: builder.mutation({
      query: ({ ids }) => ({ 
        url: `/leaves/delete-many`,
        method: "DELETE",
        body: { ids }
      }),
      invalidatesTags: [{ type: "Leave", id: "LIST" }],
    }),

    bulkCreateLeaves: builder.mutation({
      query: (leaves) => ({
        url: "/leaves/create-many",
        method: "POST",
        body: { leaves },
      }),
      invalidatesTags: [{ type: "Leave", id: "LIST" }],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetLeavesQuery,
  useGetLeavesWithPaginationQuery,
  useGetLeaveQuery,
  useCreateLeaveMutation,
  useUpdateLeaveMutation,
  useDeleteLeaveMutation,
  useDeleteLeavesMutation,
  useBulkCreateLeavesMutation,
  useApproveLeaveMutation
} = leavesApi;