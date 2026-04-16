'use client';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";

// Helper function to get the auth token
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
