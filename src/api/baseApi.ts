import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  id: number;
  title: string;
  body: string;
  postId: number;
  authorId: number;
  content: string;
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

export interface CommentAuthor{
  id: number;
  email: string;
}
export interface CommentItem{
  id: number;
  content: string;
  postId: number;
  authorId: number;
  createdAt: string;
  author: CommentAuthor;
}

export interface CreateCommentPayLoad{
  postId: number;
  content: string;
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    credentials: "include",
  }),
  tagTypes: ["Me", "Comments"],
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
    getPostComments: builder.query<CommentItem[], number>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (_result, _err, postId) => [{ type: "Comments", id: postId }]
    }),
    createComment: builder.mutation<CommentItem, CreateCommentPayLoad>({
      query: ({ postId, content }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: content,
      })
    }),
    deleteComment: builder.mutation<void, { commentId: number, postId: number} >({
      query: ({ commentId }) => ({ url: `/comments/${commentId}`, method: "DELETE" }),
      invalidatesTags: (_result, _err, { postId }) => [{type: "Comments", id: postId}]
    })
  }),
});

export const {
  useGetPostsQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useGetPostCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation
} = baseApi;