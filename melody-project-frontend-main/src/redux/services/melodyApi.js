import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const melodyApi = createApi({
  reducerPath: "melodyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://melodystream.herokuapp.com",
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
    getLikedSongs: builder.query({ query: () => "/song/like" }),
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
} = melodyApi;
