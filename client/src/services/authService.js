import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQueries";

export const authAPI = createApi({
   reducerPath: "authAPI",
   baseQuery: publicBaseQuery,
   endpoints: (builder) => ({
      signIn: builder.mutation({
         query: ({ email, password }) => ({
            url: `/api/auth/login`,
            method: "POST",
            body: { email, password },
         }),
      }),
      signUp: builder.mutation({
         query: ({ values }) => ({
            url: `/api/auth/register`,
            method: "POST",
            body: { ...values },
         }),
      }),
   }),
});

export const { useSignInMutation, useSignUpMutation } = authAPI;
