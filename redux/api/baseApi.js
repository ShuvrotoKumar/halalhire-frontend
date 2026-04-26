'use client';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";

import { setUser, logout } from "../Slice/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const token = state?.auth?.token || (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem("refreshToken") : null;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // extract the new token
        const newToken = refreshResult.data?.data?.token || refreshResult.data?.token || refreshResult.data?.accessToken;
        
        if (newToken) {
          // store the new token
          if (typeof window !== 'undefined') {
             localStorage.setItem("token", newToken);
          }
          api.dispatch(setUser({ user: api.getState().auth.user, token: newToken }));
          
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
           api.dispatch(logout());
        }
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

// Helper function to get the auth token
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "admin",
    "dashboard",
    "user",
    "termsAndConditions",
    "faq",
    "privacy",
    "categories",
    "formation",
    "coupon",
    "earning",
    "subscriber",
    "subscription",
    "profile",
    "category",
    "listings",
    "notification",
    "NDA",
    "contact",
  ],
});
