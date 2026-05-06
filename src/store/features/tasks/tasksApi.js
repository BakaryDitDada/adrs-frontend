import { baseApiSlice } from '@/store/baseApiSlice';

export const tasksApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (params) => ({
        url: '/tasks',
        params,
      }),
      providesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    getTasksWithPagination: builder.query({
      query: (params) => {
        const { page, search, limit } = params;
        const checkedLimit = limit === 0 || limit === "" ? 10 : limit;

        if (search !== "") {
          return `/tasks/advanced?page=${page}&limit=${checkedLimit}&search=${search}`;
        } else {
          return `/tasks/advanced?page=${page}&limit=${checkedLimit}`;
        }
      },
      providesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    createTask: builder.mutation({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    patchTaskStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      // Optimistic update: we can manually update the cache, but for simplicity we'll invalidate the list
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }, { type: 'Task', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTasksWithPaginationQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  usePatchTaskStatusMutation,
} = tasksApi;