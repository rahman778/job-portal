import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQueries";

export const categoryAPI = createApi({
   reducerPath: "categoryAPI",
   baseQuery: publicBaseQuery,
   endpoints: (build) => ({
      getCategories: build.query({
         query: () => ({
            url: `/api/category/list`,
         }),
         transformResponse: (response) => response.data,
      }),
      getCategoryCount: build.query({
         query: () => ({
            url: `/api/category/count`,
         }),
         transformResponse: (response) => response.data,
      }),
   }),
});

export const { useGetCategoriesQuery, useGetCategoryCountQuery } = categoryAPI;
