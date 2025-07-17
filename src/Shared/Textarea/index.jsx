import { formStatus } from "../../Constant";
import { StyledTextarea } from "./style";

export const Textarea = ({
  value,
  onChange,
  placeholder = "",
  status = "",
  name,
  className = "",
  rows = 4,
  ...props
}) => {
  const isDisabled = status === formStatus.DISABLED;

  return (
    <StyledTextarea
      value={value}
      onChange={!isDisabled ? onChange : undefined}
      placeholder={placeholder}
      name={name}
      disabled={isDisabled}
      rows={rows}
      className={`${status} ${className}`}
      {...props}
    />
  );
};
