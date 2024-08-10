import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

export const watchlistAPI = createApi({
  reducerPath: "watchlistAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getWatchlistJobs: build.query({
      query: () => ({
        url: `/api/watchlist`,
      }),
      transformResponse: (response) => response.watchlist,
    }),
    updateWatchlistJobs: build.mutation({
      query: ({ values }) => ({
        url: `/api/watchlist/add`,
        method: "POST",
        body: { ...values },
      }),
    }),
  }),
});

export const { useGetWatchlistJobsQuery, useUpdateWatchlistJobsMutation } =
  watchlistAPI;
