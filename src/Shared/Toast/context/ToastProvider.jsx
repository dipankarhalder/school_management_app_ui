import { useReducer, useCallback } from "react";
import { ToastContext } from "./ToastContext";
import { Toast } from "../index";

const SHOW_TOAST = "SHOW_TOAST";
const HIDE_TOAST = "HIDE_TOAST";

const initialToastState = {
  show: false,
  type: "",
  heading: "",
  description: "",
};

const toastReducer = (state, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return { show: true, ...action.payload };
    case HIDE_TOAST:
      return { ...state, show: false };
    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialToastState);

  const addToast = useCallback((message, duration = 5000) => {
    if (!message.type) {
      return false;
    }
    dispatch({
      type: SHOW_TOAST,
      payload: {
        type: message.type,
        heading: message.title,
        description: message.description,
      },
    });
    setTimeout(() => {
      dispatch({ type: HIDE_TOAST });
    }, duration);
  }, []);

  const removeToast = () => {
    dispatch({ type: HIDE_TOAST });
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {state.show && (
        <Toast show={state.show} removeToast={removeToast} toastData={state} />
      )}
    </ToastContext.Provider>
  );
};
