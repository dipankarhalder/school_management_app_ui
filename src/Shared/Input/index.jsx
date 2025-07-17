import { formStatus } from "../../Constant";
import { StyledInput } from "./style";

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  status = "",
  name,
  className = "",
  ...props
}) => {
  const isDisabled = status === formStatus.DISABLED;

  return (
    <StyledInput
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
};
