import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

export const jobAPI = createApi({
   reducerPath: "jobAPI",
   baseQuery: baseQueryWithReauth,
   endpoints: (build) => ({
      getJobs: build.query({
         query: (filters) => ({
            url: `/api/job/list`,
            params: filters,
         }),
      }),
      getJob: build.query({
         query: ({ jobId }) => ({
            url: `/api/job/detail/${jobId}`,
         }),
         transformResponse: (response) => response.data,
      }),
      getCompanyJobs: build.query({
         query: () => ({
            url: `/api/job/list/company`,
         }),
         transformResponse: (response) => response.jobs,
      }),
      getJobStats: build.query({
         query: (filters) => ({
            url: `/api/job/stats`,
            params: filters,
         }),
      }),
      addJob: build.mutation({
         query: ({ values }) => ({
            url: `/api/job/add`,
            method: "POST",
            body: { ...values },
         }),
      }),
      updateJob: build.mutation({
         query: ({ values, jobId }) => ({
            url: `/api/job/${jobId}`,
            method: "PUT",
            body: { ...values },
         }),
      }),
      deleteJob: build.mutation({
         query: ({ jobId }) => ({
            url: `/api/job/delete/${jobId}`,
            method: "DELETE",
         }),
      }),
   }),
});

export const {
   useGetJobsQuery,
   useGetJobQuery,
   useGetCompanyJobsQuery,
   useGetJobStatsQuery,
   useAddJobMutation,
   useUpdateJobMutation,
   useDeleteJobMutation
} = jobAPI;
