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
        return {
          url: `/current_subscriber/create_current_subscriber`,
          method: "POST",
          body: {
            user_type: "user",
            ...data
          },
        };
      },
      providesTags: ["subscriber"],
    }),
    getFreeSubscriber: builder.query({
      query: (params) => {
        return {
          url: `/current_subscriber/get_current_subscriber_by_user`,
          method: "GET",
          params,
        };
      },
      providesTags: ["subscriber"],
    }),
  }),
});

export const { useCreateSubscriptionMutation, useGetSubscriptionQuery, useCreateFreeSubscriberMutation, useGetFreeSubscriberQuery, useLazyGetFreeSubscriberQuery } = allSubscriberApi;
