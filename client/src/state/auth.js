import { createSlice } from "@reduxjs/toolkit";
import { isAccessTokenExists, removeToken } from "../utils/token";

const initState = {
   profile: {},
   isSignedIn: isAccessTokenExists(),
   isLoading: false,
};

const authSlice = createSlice({
   name: "auth",
   initialState: initState,
   reducers: {
      setUser(state, { payload }) {
         state.profile = payload;
         state.isSignedIn = true;
      },
      logout(state) {
         state.profile = {};
         state.isSignedIn = false;
         removeToken();
      },
      setLoading(state, { payload }) {
         state.isLoading = payload;
      },
   },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
