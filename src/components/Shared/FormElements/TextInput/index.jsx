import { Input } from "../../../../Shared/Input";
import { AppFromField, AppErrorMessage } from "../style";

export const TextInput = ({
  name,
  label,
  placeholder = "",
  register,
  validation = {},
  errors,
}) => {
  const error = errors?.[name];

  const enhancedValidation = {
    ...validation,
    validate: (value) => {
      if (typeof value === "string" && value.trim() !== value) {
        return `${label} cannot start or end with spaces`;
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
        type="text"
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
