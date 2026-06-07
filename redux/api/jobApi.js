import { baseApi } from "./baseApi";

const jobApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJob: builder.query({
            query: ({ id, page = 1, limit = 5 }) => {
                return {
                    url: `/employee/find_my_all_job_post/${id}`,
                    method: "GET",
                    params: { page, limit },
                };
            },
            providesTags: ["job"],  
        }),
        createJobPost: builder.mutation({
            query: (data) => {
                return {
                    url: `/employee/create_job_post`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["job"],
        }),
        updateJobPost: builder.mutation({
            query: ({id, data}) => {
                return {
                    url: `/employee/update_job_post/${id}`,
                    method: "PATCH",
                    body: data,
                };
            },
            invalidatesTags: ["job"],
        }),
        deleteJobPost: builder.mutation({
            query: ({id}) => {
                return {
                    url: `/employee/delete_job_post/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["job"],
        }),
        getRequest: builder.query({
            query: ({ id, accepted = false, page = 1, limit = 10 }) => {
                return {
                    url: `/apply/find_by_specific_company_applied_candidate/${id}`,
                    method: "GET",
                    params: { accepted, page, limit },
                };
            },
            providesTags: ["job"],
        }),
        getJobDetails: builder.query({
            query: ({id}) => {
                return {
                    url: `/apply/find_by_specific_company_applied_user_details/${id}`,
                    method: "GET",
                };
            },
            providesTags: ["job"],
        }),
        
    }),
});

export const { useGetJobQuery, useCreateJobPostMutation, useUpdateJobPostMutation, useDeleteJobPostMutation, useGetRequestQuery, useGetJobDetailsQuery } = jobApi;