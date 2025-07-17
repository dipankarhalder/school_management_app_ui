import { formStatus } from "../../Constant";
import { Spinner } from "../Icons";
import { StyledButton } from "./style";

export const Button = ({
  children,
  status = "",
  onClick,
  className = "",
  ...props
}) => {
  const isDisabled =
    status === formStatus.DISABLED || status === formStatus.LOADING;

  return (
    <StyledButton
      className={`${status} ${className}`}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      {...props}
    >
      {status === formStatus.LOADING ? (
        <>
          Please wait... <Spinner />
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};
