import React from 'react';
import type { Post } from '../api/baseApi';

interface PostItemProps {
  post: Post;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="post-item">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <span>Автор ID: {post.authorId}</span>
    </div>
  );
};