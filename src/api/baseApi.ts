import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
    }),
  }),
});

export const { useGetPostsQuery } = baseApi;