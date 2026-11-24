import type React from 'react';
import type { Post } from '../api/baseApi';
import { PostItem } from './PostItem';

interface PostListProps {
  posts: Post[];
  currentUserId?: number;
}

export const PostList: React.FC<PostListProps> = ({ posts, currentUserId }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};