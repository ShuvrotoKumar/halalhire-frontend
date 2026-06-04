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
          body: data,
        };
      },
      providesTags: ["subscriber"],
    }),
    getFreeSubscriber: builder.query({
      query: (data) => {
        return {
          url: `/current_subscriber/get_current_subscriber_by_user`,
          method: "GET",
          params: {
            user_type: "user",
            ...data
          },
        };
      },
      providesTags: ["subscriber"],
    }),
    getPremiumPlan: builder.query({
      query: (id) => {
        return {
          url: `/payment_gateway/create-onboarding-link`,
          method: "GET",
          params: {
            user_id: id
          }
        };
      },
      providesTags: ["subscriber"],
    }),
    createCheckoutSession: builder.mutation({
      query: (params) => ({
        url: "/payment_gateway/create-checkout-session",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const { useCreateSubscriptionMutation, useGetSubscriptionQuery, useGetFreeSubscriberQuery, useCreateFreeSubscriberMutation, useGetPremiumPlanQuery, useCreateCheckoutSessionMutation } = allSubscriberApi;
