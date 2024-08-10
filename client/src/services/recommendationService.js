import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

export const recommendationAPI = createApi({
   reducerPath: "recommendationAPI",
   baseQuery: baseQueryWithReauth,
   endpoints: (build) => ({
      getSuggestedJobs: build.query({
         query: () => ({
            url: `/api/recommendation/jobs`,
         }),
      }),
      getSuggestedCandidates: build.query({
        query: ({jobId}) => ({
           url: `/api//candidates/${jobId}`,
        }),
     }),
   }),
});

export const {
   useGetSuggestedJobsQuery,
   useGetSuggestedCandidatesQuery
} = recommendationAPI;
