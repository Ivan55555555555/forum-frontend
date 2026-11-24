import { useGetMeQuery, useGetPostsQuery } from "./api/baseApi";
import "./App.css";
import { PostList } from "./components/PostList";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";

function App() {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();
  const { data: user, isLoading: isUserLoading } = useGetMeQuery();

  return (
    <div className="app-container">
      <div className="auth-section">
        <h1>Forum</h1>
        {isUserLoading ? (
          <p>Перевіряємо авторизацію...</p>
        ) : user ? (
          <p>Ви авторизовані як {user.email}</p>
        ) : (
          <>
            <RegisterForm />
            <LoginForm />
          </>
        )}
      </div>

      {isLoading && <h2>Завантаження постів...</h2>}
      {isError && <h2>Не вдалося завантажити пости</h2>}
      {!isLoading && !isError && posts.length === 0 && (
        <p>Постів поки що немає.</p>
      )}
      {!isLoading && !isError && posts.length > 0 && (
        <PostList posts={posts} currentUserId={user?.id} />
      )}
    </div>
  );
}

export default App;