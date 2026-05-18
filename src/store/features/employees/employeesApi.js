import { baseApiSlice } from "@/store/baseApiSlice";

export const employeesApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: (params) => ({
        url: '/employees',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Employee', id })),
              { type: 'Employee', id: 'LIST' },
            ]
          : [{ type: 'Employee', id: 'LIST' }],
    }),
    getEmployeesWithPagination: builder.query({
      query: (args) => {
        const { page, search, limit } = args;
        const checkedLimit = limit === 0 || limit === "" ? 6 : limit;
        if (search !== "") {
          return `/employees/advanced?page=${page}&limit=${checkedLimit}&search=${search}`;
        } else {
          return `/employees/advanced?page=${page}&limit=${checkedLimit}`;
        }
      },
      providesTags: [{ type: 'Employee', id: 'LIST' }],
    }),
    getEmployee: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: [{ type: 'Employee', id: "LIST" }],
    }),
    searchEmployees: builder.query({
      query: ({searchTerm, limit}) => `/employees?search=${searchTerm}&limit=${limit}`,
    }),
    createEmployee: builder.mutation({
      query: (body) => ({
        url: '/employees',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Employee', id: 'LIST' }],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/employees/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Employee', id: 'LIST' }],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Employee', id: "LIST" }],
    }),
    bulkCreateEmployees: builder.mutation({
      query: (employees) => ({
        url: '/employees/bulk-create',
        method: 'POST',
        body: { employees },
      }),
      invalidatesTags: [{ type: 'Employee', id: 'LIST' }],
    }),
  }),
  overrideExisting: true
});

export const {
  useGetEmployeesQuery,
  useSearchEmployeesQuery,
  useGetEmployeesWithPaginationQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useBulkCreateEmployeesMutation,
} = employeesApi;