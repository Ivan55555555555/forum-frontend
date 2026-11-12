import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../api/baseApi";

type RegisterValues = {
  email: string;
  password: string;
};

export function RegisterForm() {
  const { register, handleSubmit, reset } = useForm<RegisterValues>();
  const [registerUser, { isLoading }] = useRegisterMutation();

  async function onSubmit(data: RegisterValues) {
    const result = await registerUser(data);

    if (result.data) {
      alert(`Користувач ${result.data.email} успішно зареєструвався!`);
      reset();
    } else {
      alert("Помилка реєстрації! Можливо, такий email вже існує або дані некоректні.");
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Реєстрація</h3>
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
        {isLoading ? "Завантаження..." : "Зареєструватися"}
      </button>
    </form>
  );
}