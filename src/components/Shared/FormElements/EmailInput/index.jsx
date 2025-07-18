import { Input } from "../../../../Shared/Input";
import { AppFromField, AppErrorMessage } from "../style";

export const EmailInput = ({
  name = "email",
  label = "Email",
  placeholder = "Enter your email",
  register,
  validation,
  errors,
}) => {
  const error = errors?.[name];

  const enhancedValidation = {
    ...validation,
    validate: (value) => {
      if (value.trim() !== value) {
        return "Email cannot start or end with spaces";
      }
      return (
        (typeof validation.validate === "function" &&
          validation.validate(value)) ||
        true
      );
    },
  };

  return (
    <AppFromField>
      <label htmlFor={name}>{label}</label>
      <Input
        id={name}
        name={name}
        type="email"
        placeholder={placeholder}
        {...register(name, enhancedValidation)}
        onBlur={(e) => {
          e.target.value = e.target.value.trim();
        }}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
      {error && (
        <AppErrorMessage id={`${name}-error`}>{error.message}</AppErrorMessage>
      )}
    </AppFromField>
  );
};
