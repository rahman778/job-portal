import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

export const commentAPI = createApi({
   reducerPath: "commentAPI",
   baseQuery: baseQueryWithReauth,
   endpoints: (build) => ({
      getComments: build.query({
         query: (applicationId) => ({
            url: `/api/comment/application/${applicationId}`,
         }),
         transformResponse: (response) => response.data,
      }),
      addComment: build.mutation({
        query: ({ values }) => ({
           url: `/api/comment/add`,
           method: "POST",
           body: { ...values },
        }),
     }),
   }),
});

export const {
   useGetCommentsQuery,
   useAddCommentMutation
} = commentAPI;
