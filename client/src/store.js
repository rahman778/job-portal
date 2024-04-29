import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { categoryAPI } from "./services/categoryService";
import { jobAPI } from "./services/jobService";
import { skillAPI } from "./services/skillService";

const combinedReducer = combineReducers({
   [categoryAPI.reducerPath]: categoryAPI.reducer,
   [jobAPI.reducerPath]: jobAPI.reducer,
   [skillAPI.reducerPath]: skillAPI.reducer,
   // ... add your reducers here
});

// we structure store like this so that we can easily reset the store on logout.
const rootReducer = (state, action) => {
   if (action.type === "auth/logout") {
      state = undefined;
   }
   return combinedReducer(state, action);
};

export const store = configureStore({
   reducer: rootReducer,
   //add rtkq middleware to below aray
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
         .concat(categoryAPI.middleware)
         .concat(jobAPI.middleware)
         .concat(skillAPI.middleware),
   devTools: true,
});
