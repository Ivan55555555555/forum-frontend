import type React from 'react';
import type { Post } from '../api/baseApi';
import { PostComments } from './postComments';

interface PostItemProps {
  post: Post;
  currentUserId?: number;
}

export const PostItem: React.FC<PostItemProps> = ({ post, currentUserId }) => {
  return (
    <div className="post-item">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <span>Автор ID: {post.authorId}</span>
      <PostComments postId={post.id} currentUserId={currentUserId} />
    </div>
  );
};