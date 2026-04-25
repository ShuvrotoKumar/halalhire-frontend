'use client';

import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => {
        console.log("Data being sent to the API:", data);
        return {
          url: "/auth/login_user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["admin"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password-check-otp",
        method: "PATCH",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "auth/reset-password",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: localStorage.getItem("resetToken"),
        },
      }),
      invalidatesTags: ["admin"],
    }),
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "/user/create_user",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["admin"],
    }),
    registerCompany: builder.mutation({
      query: (formData) => ({
        url: "/user/register_company",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["admin"],
    }),
    verifyUser: builder.mutation({
      query: (data) => ({
        url: "/user/user_verification",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useRegisterUserMutation,
  useRegisterCompanyMutation,
  useVerifyUserMutation,
} = authApi;

export default authApi;
