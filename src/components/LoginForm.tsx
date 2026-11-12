import { useForm } from "react-hook-form";
import { useLoginMutation } from "../api/baseApi";

type LoginValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { register, handleSubmit, reset } = useForm<LoginValues>();
  const [loginUser, { isLoading }] = useLoginMutation();

  async function onSubmit(data: LoginValues) {
    const result = await loginUser(data);

    if (result.data) {
      alert(`Вхід виконано успішно! Вітаємо, ${result.data.email || data.email}!`);
      reset();
    } else {
      alert("Помилка авторизації! Перевірте правильність пошти та пароля.");
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Авторизація</h3>
      <input
        type="email"
        placeholder="Електронна пошта"
        required
        {...register("email")}
      />
      <input
        type="password"
        placeholder="Пароль"
        required
        {...register("password")}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Вхід..." : "Увійти"}
      </button>
    </form>
  );
}