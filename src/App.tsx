import { useGetPostsQuery } from './api/baseApi';
import './App.css';
import { PostList } from './components/PostList';

function App() {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();

  return (
    <div>
      <h1>Форум</h1>
      
      <PostList posts={posts} />

      {isLoading && (
        <h1>Завантаження постів...</h1>
      )}

      {isError && (
        <h1>Не вдалося завантажити пости</h1>
      )}
    </div>
  );
}

export default App;