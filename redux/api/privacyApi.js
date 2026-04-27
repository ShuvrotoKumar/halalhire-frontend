'use client';

import { baseApi } from "./baseApi";

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "/setting/find_by_privacy_policys",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
    updatePrivacy: builder.mutation({
      query: ({ id, requestData }) => ({
        url: `/setting/privacy_policys`,
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
    getCookies: builder.query({
      query: () => ({
        url: "/setting/find_by_cookie_policy",
        method: "GET",
      }),
      providesTags: ["cookies"],
    }),
    getAccessibility: builder.query({
      query: () => ({
        url: "/setting/find_by_accessibility",
        method: "GET",
      }),
      providesTags: ["accessibility"],
    }),
    getImprint: builder.query({
      query: () => ({
        url: "/setting/find_by_imprints",
        method: "GET",
      }),
      providesTags: ["imprint"],
    }),
  }),
});

export const { useGetPrivacyQuery, useUpdatePrivacyMutation, useGetCookiesQuery, useGetAccessibilityQuery, useGetImprintQuery } = privacyApi;
