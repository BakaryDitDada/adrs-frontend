import { baseApiSlice } from "@/store/baseApiSlice";

export const projectsApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (params) => ({
        url: '/projects',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Project', id })),
              { type: 'Project', id: 'LIST' },
            ]
          : [{ type: 'Project', id: 'LIST' }],
    }),
    getProjectsWithPagination: builder.query({
      query: (args) => {
        const { page, search, limit } = args;
        const checkedLimit = limit === 0 || limit === "" ? 6 : limit;
        if (search !== "") {
          return `/projects/advanced?page=${page}&limit=${checkedLimit}&search=${search}`;
        } else {
          return `/projects/advanced?page=${page}&limit=${checkedLimit}`;
        }
      },
      providesTags: [{ type: 'Project', id: 'LIST' }],
    }),
    getProject: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: [{ type: 'Project', id: "LIST" }],
    }),
    searchProjects: builder.query({
      query: ({searchTerm, limit}) => `/projects?search=${searchTerm}&limit=${limit}`,
    }),
    createProject: builder.mutation({
      query: (body) => ({
        url: '/projects',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Project', id: "LIST" }],
    }),
    bulkCreateProjects: builder.mutation({
      query: (projects) => ({
        url: '/projects/bulk-create',
        method: 'POST',
        body: { projects },
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),
  }),
  overrideExisting: true
});

export const {
  useGetProjectsQuery,
  useSearchProjectsQuery,
  useGetProjectsWithPaginationQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useBulkCreateProjectsMutation,
} = projectsApi;