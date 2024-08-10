import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

export const userAPI = createApi({
   reducerPath: "userAPI",
   baseQuery: baseQueryWithReauth,
   endpoints: (build) => ({
      getProfile: build.query({
         query: () => ({
            url: `/api/user/me`,
         }),
         provides: ["Auth"],
         transformResponse: (response) => response.user,
      }),

      updateUser: build.mutation({
         query: ({ values }) => ({
            url: `/api/user`,
            method: "PUT",
            body: { ...values },
         }),
         invalidates: ["Auth"],
      }),

      updateProfile: build.mutation({
         query: ({ values }) => ({
            url: `/api/user/profile`,
            method: "PUT",
            body: values,
         }),
         invalidates: ["Auth"],
      }),
   }),
});

export const { useGetProfileQuery, useUpdateUserMutation, useUpdateProfileMutation } = userAPI;
