import { Cross } from "../Icons";
import { ToastWrapper, ToastCover, ToastContent, CloseButton } from "./style";

export const Toast = ({ show, removeToast, toastData }) => {
  const { type, heading, description } = toastData;

  return (
    <ToastWrapper $show={show}>
      <ToastCover type={type}>
        <ToastContent>
          <h5>{heading}</h5>
          {description && <p>{description}</p>}
        </ToastContent>
        <CloseButton onClick={removeToast}>
          <Cross />
        </CloseButton>
      </ToastCover>
    </ToastWrapper>
  );
};
