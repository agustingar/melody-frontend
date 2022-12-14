import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const melodyApi = createApi({
  reducerPath: "melodyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://melody-music-stream-production.up.railway.app",
    prepareHeaders: (headers) => {
      headers.set(
        "auth_token",
        localStorage.getItem("userToken") || "no token found"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllSongs: builder.query({ query: () => "/song/all-songs" }),
    getPlaylist: builder.query({ query: () => "/playlist/user/playlist" }),
    getAllPlaylist: builder.query({ query: () => "/playlist/public" }),
    getPlaylistSongs: builder.query({
      query: (playlist) => `/playlist/${playlist}`,
    }),
    getSong: builder.query({ query: (id) => `/song/${id}` }),
    getLikedSongs: builder.query({
      query: () => "/song/like",
      providesTags: ["Post"],
    }),
    editLikedSongs: builder.mutation({
      query: (post) => ({
        url: `https://melody-music-stream-production.up.railway.app/song/like/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    getUserSongs: builder.query({ query: () => "/song/all-user-songs" }),
    getUser: builder.query({ query: () => "/user" }),
  }),
});

export const {
  useGetAllSongsQuery,
  useGetPlaylistQuery,
  useGetAllPlaylistQuery,
  useGetLikedSongsQuery,
  useGetSongQuery,
  useGetUserSongsQuery,
  useGetUserQuery,
  useEditLikedSongsMutation,
} = melodyApi;
