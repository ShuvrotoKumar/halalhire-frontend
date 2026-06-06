import { baseApi } from "./baseApi";

const avatarApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAvatar: builder.query({
            query: () => {
                return {
                    url: "/auth/find_my_avatar",
                    method: "GET",
                };
            },
            providesTags: ["avatar"],
        }),
    }),
});

export const { useGetAvatarQuery } = avatarApi;