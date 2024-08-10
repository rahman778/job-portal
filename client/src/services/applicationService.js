import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

export const applicationAPI = createApi({
  reducerPath: "applicationAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getJobsApplication: build.query({
      query: (jobId) => ({
        url: `/api/application/job/${jobId}`,
      }),
      transformResponse: (response) => response.data,
    }),
    getMyApplications: build.query({
      query: () => ({
        url: `/api/application/applied`,
      }),
      transformResponse: (response) => response.data,
    }),
    addApplication: build.mutation({
      query: ({ values, jobId }) => ({
        url: `/api/application/add/${jobId}`,
        method: "POST",
        body: { ...values },
      }),
    }),
    updateApplication: build.mutation({
      query: ({ values, applicationId }) => ({
        url: `/api//application/${applicationId}`,
        method: "PUT",
        body: { ...values },
      }),
    }),
  }),
});

export const {
  useGetJobsApplicationQuery,
  useGetMyApplicationsQuery,
  useAddApplicationMutation,
  useUpdateApplicationMutation
} = applicationAPI;
