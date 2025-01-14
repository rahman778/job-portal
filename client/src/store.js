import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "./state/auth";

import { authAPI } from "./services/authService";
import { categoryAPI } from "./services/categoryService";
import { jobAPI } from "./services/jobService";
import { skillAPI } from "./services/skillService";
import { userAPI } from "./services/userService";
import { recommendationAPI } from "./services/recommendationService";
import { watchlistAPI } from "./services/watchlistService";
import { applicationAPI } from "./services/applicationService";
import { commentAPI } from "./services/commentService";

const combinedReducer = combineReducers({
  auth: authReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [categoryAPI.reducerPath]: categoryAPI.reducer,
  [jobAPI.reducerPath]: jobAPI.reducer,
  [skillAPI.reducerPath]: skillAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [recommendationAPI.reducerPath]: recommendationAPI.reducer,
  [watchlistAPI.reducerPath]: watchlistAPI.reducer,
  [applicationAPI.reducerPath]: applicationAPI.reducer,
  [commentAPI.reducerPath]: commentAPI.reducer,
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
      .concat(authAPI.middleware)
      .concat(categoryAPI.middleware)
      .concat(jobAPI.middleware)
      .concat(skillAPI.middleware)
      .concat(userAPI.middleware)
      .concat(recommendationAPI.middleware)
      .concat(watchlistAPI.middleware)
      .concat(applicationAPI.middleware)
      .concat(commentAPI.middleware),
  devTools: true,
});
