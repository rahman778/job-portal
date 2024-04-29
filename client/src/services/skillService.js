import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQueries";

export const skillAPI = createApi({
   reducerPath: "skillAPI",
   baseQuery: publicBaseQuery,
   endpoints: (build) => ({
      getSkills: build.query({
         query: (query) => ({
            url: `/api/skill/${query}`,
         }),
         transformResponse: (response) => response.data,
      }),
   }),
});

export const { useGetSkillsQuery } = skillAPI;
