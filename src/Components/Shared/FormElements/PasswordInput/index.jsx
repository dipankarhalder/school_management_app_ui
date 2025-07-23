import { Input } from "../../../../Shared/Input";
import { AppFromField, AppErrorMessage } from "../style";

export const PasswordInput = ({
  name = "password",
  label = "Password",
  placeholder = "Enter your password",
  register,
  validation,
  errors,
}) => {
  const error = errors?.[name];

  return (
    <AppFromField>
      <label htmlFor={name}>{label}</label>
      <Input
        id={name}
        name={name}
        type="password"
        placeholder={placeholder}
        {...register(name, validation)}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
      {error && (
        <AppErrorMessage id={`${name}-error`}>{error.message}</AppErrorMessage>
      )}
    </AppFromField>
  );
};
