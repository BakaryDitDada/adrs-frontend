import { baseApiSlice } from "@/store/baseApiSlice";

export const usersApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query({
      query: ({searchTerm, limit}) => `/users?search=${searchTerm}&limit=${limit}`,
    }),
  }),
});

export const { useSearchUsersQuery } = usersApi;