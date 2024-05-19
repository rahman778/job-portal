import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

export const jobAPI = createApi({
   reducerPath: "jobAPI",
   baseQuery: baseQueryWithReauth,
   endpoints: (build) => ({
      getJobs: build.query({
         query: (filters) => ({
            url: `/api/job/list`,
            params:filters
         }),
      }),
      getJobStats: build.query({
         query: (filters) => ({
            url: `/api/job/stats`,
            params:filters
         }),
      }),
      addJob: build.mutation({
         query: ({ values }) => ({
            url: `/api/job//add`,
            method: "POST",
            body: { ...values },
         }),
      }),
   }),
});

export const { useGetJobsQuery, useGetJobStatsQuery, useAddJobMutation } = jobAPI;
