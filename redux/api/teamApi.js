import { baseApi } from "./baseApi";

const teamApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTeam: builder.query({
            query: ({id}) => {
                return {
                    url: `/team/find_my_team/${id}`,
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
        deleteTeam: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/team/delete_team/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["team"],
        }),
    }),
});

export const { useGetTeamQuery, useCreateTeamMutation, useDeleteTeamMutation } = teamApi;