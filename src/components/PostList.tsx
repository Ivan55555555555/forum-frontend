import React from 'react';
import type { Post } from '../api/baseApi';
import { PostItem } from './PostItem';

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};