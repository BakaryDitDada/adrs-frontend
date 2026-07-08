import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, signOut } from "./features/auth/authSlice";

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
  // Detect the target endpoint URL to prevent self-intercepting loops
  const requestUrl = typeof args === "string" ? args : args?.url || "";
  
  // Checks if the request is targeting signin, signup, or initial token refresh
  const isAuthEndpoint = 
    requestUrl.includes("/auth/signin") || 
    requestUrl.includes("/auth/refresh");

  let result = await baseQuery(args, api, extraOptions);

  // 1. Isolate the exact scenario where the access token has expired...
  const isJwtExpired = 
    result?.error?.status === 401 && 
    result?.error?.data?.message === "jwt expired";

  if (isJwtExpired && isAuthEndpoint) {
    // Sending refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      const access_token = refreshResult.data.access_token;

      api.dispatch(setCredentials({ access_token, user }));

      // Retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);

    } else {
      api.dispatch(signOut());

      // redirect to login
      // Avoid hard reload if possible (Next.js best practice)
      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = "/auth";
        }, 10)
      }

      return refreshResult;
    }
  } else if((result?.error?.status === 401 || result?.error?.status === 403) && !isAuthEndpoint) {
    api.dispatch(signOut());

    if (typeof window !== "undefined" && window.location.pathname !== "/auth") {
      setTimeout(() => {
        window.location.href = "/auth";
      }, 10)
    }
    
    return result;
  }

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
    "AIReports",
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
