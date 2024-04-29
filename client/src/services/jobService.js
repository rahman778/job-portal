import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQueries";

export const jobAPI = createApi({
   reducerPath: "jobAPI",
   baseQuery: publicBaseQuery,
   endpoints: (build) => ({
      getJobs: build.query({
         query: (filters) => ({
            url: `/api/job/list?${filters}`,
         }),
         transformResponse: (response) => response.data,
      }),
   }),
});

export const { useGetJobsQuery } = jobAPI;
