import { baseApi } from "./baseApi";

const companyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCompany: builder.query({
            query: () => {
                return {
                    url: "/user/find_my_overview",
                    method: "GET",
                };
            },
            providesTags: ["company"],
        }),
        updateCompany: builder.mutation({
            query: (data) => {
                return {
                    url: "/employee/update_company_profile",
                    method: "PATCH",
                    body: data,
                };
            },
            invalidatesTags: ["company"],
        }),
    }),
});

export const { useGetCompanyQuery, useUpdateCompanyMutation } = companyApi;