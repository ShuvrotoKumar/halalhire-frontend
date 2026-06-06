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
    }),
});

export const { useGetCompanyQuery } = companyApi;