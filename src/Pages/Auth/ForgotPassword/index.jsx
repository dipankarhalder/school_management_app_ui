import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { paths } from "../../../Constant";
import { Button } from "../../../Shared/Button";
import { Logo } from "../../../Components/Common/Logo";
import { EmailInput } from "../../../Components/Shared/FormElements/EmailInput";
import { ToastContext } from "../../../Shared/Toast/context/ToastContext";

import {
  AppSignin,
  AppInsideSignin,
  AppHeadingSignin,
  AppFormSignin,
  AppBtnField,
  AppLinkCover,
} from "../style";

const MESSAGES = {
  email: {
    required: "Please provide your email address.",
    invalid: "Please enter a valid email.",
  },
  success: {
    title: "Reset Link Sent",
    description: "Check your inbox for the reset instructions.",
  },
};

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim("No leading or trailing spaces allowed.")
    .strict(true)
    .email(MESSAGES.email.invalid)
    .required(MESSAGES.email.required),
});

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = (data) => {
    console.log("Forgot Password Email:", data);
    addToast({
      type: "success",
      title: MESSAGES.success.title,
      description: MESSAGES.success.description,
    });

    navigate(paths.LOGIN);
  };

  return (
    <AppSignin>
      <AppInsideSignin>
        <AppHeadingSignin>
          <h1>Forgot Password?</h1>
          <p>Enter your email and we'll send you a reset link</p>
        </AppHeadingSignin>
        <AppFormSignin onSubmit={handleSubmit(onSubmit)} noValidate>
          <EmailInput
            name="email"
            label="Email Address"
            register={register}
            errors={errors}
            placeholder=""
          />
          <AppBtnField>
            <Button>Send Reset Link</Button>
          </AppBtnField>
          <AppLinkCover>
            <p>Back to</p>
            <Link to={paths.LOGIN}>Sign In</Link>
          </AppLinkCover>
        </AppFormSignin>
      </AppInsideSignin>
    </AppSignin>
  );
};
