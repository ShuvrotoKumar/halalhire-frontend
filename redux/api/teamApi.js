import { baseApi } from "./baseApi";

const teamApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTeam: builder.query({
            query: () => {
                return {
                    url: "/team/find_my_team",
                    method: "GET",
                };
            },
            providesTags: ["team"],
        }),
        createTeam: builder.mutation({
            query: (data) => {
                return {
                    url: "/team/create_team",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["team"],
        }),
        
    }),
});

export const { useGetTeamQuery, useCreateTeamMutation } = teamApi;