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
        url: "/user/forgot_password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/user/verification_forgot_user",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/reset_password",
        method: "POST",
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
    resendCode: builder.query({
      query: (email) => ({
        url: `/user/resend_verification_otp/${email}`,
        method: "GET",
      }),
      invalidatesTags: ["admin"],
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken: refreshToken || (typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null) },
      }),
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
  useResendCodeQuery,
  useLazyResendCodeQuery,
  useRefreshTokenMutation,
} = authApi;

export default authApi;
