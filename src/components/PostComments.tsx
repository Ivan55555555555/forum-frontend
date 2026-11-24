import { useForm } from "react-hook-form";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetPostCommentsQuery,
} from "../api/baseApi";

type CommentFormValues = {
  content: string;
};

interface PostCommentsProps {
  postId: number;
  currentUserId?: number;
}

export function PostComments({ postId, currentUserId }: PostCommentsProps) {
  const {
    data: comments = [],
    isLoading,
    isError,
  } = useGetPostCommentsQuery(postId);

  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    mode: "onChange",
  });

  const isFormBusy = isSubmitting || isCreating;

  async function onSubmit(values: CommentFormValues) {
    if (isFormBusy) return;

    const trimmed = values.content.trim();
    if (trimmed.length < 1 || trimmed.length > 500) {
      setError("content", {
        message: "Коментар має містити від 1 до 500 символів",
      });
      return;
    }

    try {
      await createComment({ postId, content: trimmed }).unwrap();
      reset();
    } catch {
      setError("root", {
        message: "Не вдалося надіслати коментар",
      });
    }
  }

  async function handleDelete(commentId: number) {
    if (isDeleting) return;
    try {
      await deleteComment({ commentId, postId }).unwrap();
    } catch {}
  }

  return (
    <section>
      <h4>Коментарі</h4>

      {currentUserId !== undefined ? (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <textarea
            placeholder="Напишіть коментар..."
            disabled={isFormBusy}
            {...register("content", {
              validate: (value) => {
                const len = value.trim().length;
                if (len < 1) return "Коментар не може бути порожнім";
                if (len > 500) return "Максимум 500 символів";
                return true;
              },
            })}
          />
          {errors.content && <p>{errors.content.message}</p>}
          {errors.root && <p>{errors.root.message}</p>}
          <button type="submit" disabled={isFormBusy}>
            {isFormBusy ? "Надсилання..." : "Надіслати"}
          </button>
        </form>
      ) : (
        <p>Увійдіть в акаунт, щоб залишити коментар</p>
      )}

      {isLoading && <p>Завантаження коментарів...</p>}
      {isError && <p>Не вдалося завантажити коментарі</p>}

      {!isLoading && !isError && comments.length === 0 && (
        <p>Коментарів поки немає</p>
      )}

      {!isLoading && !isError && comments.length > 0 && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <small>
                Автор: {comment.author.email} •{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </small>
              {currentUserId !== undefined &&
                comment.authorId === currentUserId && (
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => handleDelete(comment.id)}
                  >
                    Видалити
                  </button>
                )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}