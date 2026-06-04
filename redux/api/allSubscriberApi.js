import { baseApi } from "./baseApi";

export const allSubscriberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: (params) => ({
        url: "/subscription/create_subscription",
        method: "POST",
        body: {
          ...params,
        },
      }),
      providesTags: ["subscriber"],
    }),
    getSubscription: builder.query({
      query: () => {
        return {
          url: "/subscription/find_subscription",
          method: "GET",
        };
      },
      providesTags: ["subscriber"],
    }),
    createFreeSubscriber: builder.mutation({
      query: (data) => {
        const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || localStorage.getItem('accessToken')) : null;
        return {
          url: `/current_subscriber/create_current_subscriber`,
          method: "POST",
          body: data,
          headers: token ? {
            authorization: `Bearer ${token.replace(/"/g, "")}`
          } : undefined
        };
      },
      providesTags: ["subscriber"],
    }),
    getFreeSubscriber: builder.query({
      query: (data) => {
        const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || localStorage.getItem('accessToken')) : null;
        return {
          url: `/current_subscriber/get_current_subscriber`,
          method: "GET",
          params: {
            user_type: "user",
            ...data
          },
          headers: token ? {
            authorization: `Bearer ${token.replace(/"/g, "")}`
          } : undefined
        };
      },
      providesTags: ["subscriber"],
    }),
  }),
});

export const { useCreateSubscriptionMutation, useGetSubscriptionQuery, useGetFreeSubscriberQuery, useCreateFreeSubscriberMutation } = allSubscriberApi;
