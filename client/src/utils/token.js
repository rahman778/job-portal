import { ACCESS_TOKEN_NAME } from "../constants";

export const getToken = () => {
   const token =
      localStorage.getItem(ACCESS_TOKEN_NAME) ||
      sessionStorage.getItem(ACCESS_TOKEN_NAME);

   return token;
};

export const removeToken = () => {
   localStorage.removeItem(ACCESS_TOKEN_NAME);
   sessionStorage.removeItem(ACCESS_TOKEN_NAME);
};

export const isAccessTokenExists = () => {
   return (
      !!localStorage.getItem(ACCESS_TOKEN_NAME) ||
      !!sessionStorage.getItem(ACCESS_TOKEN_NAME)
   );
};
