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
          url: "/subscription/get_subscription",
          method: "GET",
        };
      },
      providesTags: ["subscriber"],
    }),
    getSubscriptionById: builder.query({
      query: (id) => {
        return {
          url: `/subscription/get_subscription/${id}`,
          method: "GET",
        };
      },
      providesTags: ["subscriber"],
    }),
  }),
});

export const { useCreateSubscriptionMutation, useGetSubscriptionQuery, useGetSubscriptionByIdQuery } = allSubscriberApi;
