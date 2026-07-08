// import { apiSlice } from "@/features/redux/apiSlice";
import { baseApiSlice } from "@/store/baseApiSlice";
import { setCredentials, signOut, setIsAuthenticated } from "./authSlice";

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          // Pulling your nested data structure safely out of the JSend/Express response format
          const access_token = data?.data?.access_token || data?.access_token;
          const user = data?.data?.user || data?.user;

          if (access_token && user) {
            // CRITICAL: This explicitly updates your state ONLY during signin execution
            dispatch(setCredentials({ access_token, user }));
          }
        } catch (error) {
          console.error("Sign-in credential provisioning failed:", error);
        }
      },
    }),
    activate: builder.mutation({
      query: (credentials) => ({
        url: "/auth/activate",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "GET"
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          dispatch(signOut())
          setTimeout(() => {
            dispatch(baseApiSlice.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.log(error)
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;

          const { access_token, user } = data

          dispatch(setCredentials({ access_token, user }))
        } catch (error) {
          dispatch(setIsAuthenticated(false));
          console.log(error || "Error refetching...")
        }
      }
    })
  }),
  overrideExisting: true
});

export const {
  useSigninMutation,
  useRegisterMutation,
  useSignoutMutation,
  useRefreshMutation,
  useActivateMutation
} = authApiSlice;

