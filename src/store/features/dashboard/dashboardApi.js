import { baseApiSlice } from "@/store/baseApiSlice";

export const dashboardApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => '/dashboard/summary',
      providesTags: ['Dashboard'],
      // Poll every 60 seconds for near-real-time updates
      keepUnusedDataFor: 60,
      // Refetch when window regains focus (user returns to tab)
      refetchOnFocus: true,
    }),
    getDashboardCharts: builder.query({
      query: () => '/dashboard/charts/overview',
      providesTags: ['Dashboard'],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetDashboardChartsQuery } = dashboardApi;