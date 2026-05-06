import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthLoading, setCredentials, setIsAuthenticated } from "./features/auth/authSlice";

const baseUrl = "http://localhost:5000/api/v1";
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// const baseUrl = "http://dngr-api.dada-dev.com/api/";
// const baseUrl = "https://dngr-api.dada-dev.com/api/";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("Accept", `application/json`);
    }

    return headers;
  },
});

export const reauthBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // console.log("Reauth Result ::: ", result.error)

  if(result?.error?.status === 401 && result?.error?.data?.message === "Unauthorized") {
    // redirect to login
    // Avoid hard reload if possible (Next.js best practice)
    if (typeof window !== "undefined") {
      window.location.href = "/auth";
    }
  }

  if (
    result?.error?.originalStatus === 403 ||
    result?.error?.originalStatus === 401 ||
    result?.error?.data?.message === "jwt expired"
  ) {
    // Sending refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      const access_token = refreshResult.data.access_token;

      api.dispatch(setCredentials({ access_token, user }));

      // Retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);

    } else {
      api.dispatch(setIsAuthenticated(false))
      api.dispatch(setAuthLoading(false))

      // redirect to login
      // Avoid hard reload if possible (Next.js best practice)
      if (typeof window !== "undefined") {
        window.location.href = "/auth";
      }

      return refreshResult;
    }
  }

  // const { access_token, user } = result?.data;

  // if(result?.data?.status === "success") api.dispatch(setCredentials({ access_token, user }));

  return result;
};

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: reauthBaseQuery,
  // keepUnusedDataFor: 30,
  tagTypes: [
    "User",
    "Project",
    "Chat",
    "AIChat",
    "AIReport",
    "Message",
    "Notification",
    "Employee",
    "Payroll",
    "Document",
    "Dashboard",
    "Department",
    "Task",
    "Leave",
  ],
  endpoints: (builder) => ({}),
});
