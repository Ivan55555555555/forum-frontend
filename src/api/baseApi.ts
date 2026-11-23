import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id?: number;
  email: string;
  access_token?: string;
}

export interface UserResponse {
  id: number;
  email: string;
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    credentials: "include",
  }),
  tagTypes: ["Me"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
    }),
    register: builder.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    getMe: builder.query<UserResponse, void>({
      query: () => "/auth/me",
      providesTags: ["Me"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
} = baseApi;