import { forwardRef } from "react";
import { formStatus } from "../../Constant";
import { StyledInput } from "./style";

export const Input = forwardRef(
  (
    {
      type = "text",
      value,
      onChange,
      placeholder = "",
      status = "",
      name,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = status === formStatus.DISABLED;

    return (
      <StyledInput
        ref={ref}
        type={type}
        value={value}
        onChange={!isDisabled ? onChange : undefined}
        placeholder={placeholder}
        name={name}
        disabled={isDisabled}
        className={`${status} ${className}`}
        {...props}
      />
    );
  }
);
