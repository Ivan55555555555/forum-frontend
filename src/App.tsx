import { useGetPostsQuery } from "./api/baseApi";
import "./App.css";
import { PostList } from "./components/PostList";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";

function App() {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();

  return (
    <div className="app-container">
      <div className="auth-section">
        <h1>Forum</h1>
        <RegisterForm />
        <LoginForm />
      </div>

      {isLoading && <h2>Завантаження постів...</h2>}
      {isError && <h2>Не вдалося завантажити пости</h2>}
      {!isLoading && !isError && posts.length === 0 && (
        <p>Постів поки що немає.</p>
      )}
      {!isLoading && !isError && posts.length > 0 && (
        <PostList posts={posts} />
      )}
    </div>
  );
}

export default App;