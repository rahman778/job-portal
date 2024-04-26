import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQueries";

export const categoryAPI = createApi({
   reducerPath: "categoryAPI",
   baseQuery: publicBaseQuery,
   endpoints: (build) => ({
      getCategories: build.query({
         query: () => ({
            url: `/api/category`,
         }),
      }),
   }),
});

export const { useGetCategoriesQuery } = categoryAPI;
