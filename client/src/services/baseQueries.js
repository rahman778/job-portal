import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../constants";

export const publicBaseQuery = fetchBaseQuery({
   baseUrl: process.env.REACT_APP_API_BASE,
});

const baseQueryWithAuthHeaders = fetchBaseQuery({
   baseUrl: process.env.REACT_APP_API_BASE,
   prepareHeaders: (headers) => {
      // this method should retrieve the token without a hook
      const token = localStorage.getItem(ACCESS_TOKEN_NAME);

      if (token) {
         headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
   },
});

// create a new mutex
const mutex = new Mutex();
export const baseQueryWithReauth = async (args, api, extraOptions) => {
   // wait until the mutex is available without locking it
   await mutex.waitForUnlock();

   let result = await baseQueryWithAuthHeaders(args, api, extraOptions);

   if (result.error && result.error.status === 401) {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME);

      if (refreshToken && !mutex.isLocked()) {
         const release = await mutex.acquire();

         try {
            const refreshResult = await baseQueryWithAuthHeaders(
               {
                  url: `/api/auth/token/refresh/`,
                  method: "POST",
                  body: {
                     refreshToken,
                  },
               },
               api,
               extraOptions
            );
            if (refreshResult.data) {
               // save new access token
               localStorage.setItem(
                  ACCESS_TOKEN_NAME,
                  refreshResult.data.accessToken
               );
               // retry the initial query
               result = await baseQueryWithAuthHeaders(args, api, extraOptions);
            } else {
               window.location = "/signout";
            }
         } finally {
            // release must be called once the mutex should be released again.
            release();
         }
      } else {
         // wait until the mutex is available without locking it
         await mutex.waitForUnlock();
         result = await baseQueryWithAuthHeaders(args, api, extraOptions);
      }
   }
   return result;
};
