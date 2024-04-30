import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQueries";

export const jobAPI = createApi({
   reducerPath: "jobAPI",
   baseQuery: publicBaseQuery,
   endpoints: (build) => ({
      getJobs: build.query({
         query: (filters) => ({
            url: `/api/job/list`,
            params:filters
         }),
      }),
      getJobStats: build.query({
         query: () => ({
            url: `/api/job/stats`,
         }),
      }),
   }),
});

export const { useGetJobsQuery, useGetJobStatsQuery } = jobAPI;
