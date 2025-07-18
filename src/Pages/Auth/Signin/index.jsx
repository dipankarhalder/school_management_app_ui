import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "../../../Shared/Button";
import { Checkbox } from "../../../Shared/Checkbox";
import { Logo } from "../../../components/common/Logo";
import { EmailInput } from "../../../components/Shared/FormElements/EmailInput";
import { PasswordInput } from "../../../components/Shared/FormElements/PasswordInput";
import { ToastContext } from "../../../Shared/Toast/context/ToastContext";

import {
  AppSignin,
  AppInsideSignin,
  AppHeadingSignin,
  AppFormSignin,
  AppCheckField,
  AppBtnField,
  AppLinkCover,
} from "../style";

const MESSAGES = {
  email: {
    required: "Please provide a valid email address.",
    invalid: "Hmm, that doesn't look like a valid email.",
  },
  password: {
    required: "Please provide a valid password.",
  },
  success: {
    title: "Signed In!",
    description: "You have successfully signed in.",
  },
};

const signinSchema = yup.object({
  email: yup
    .string()
    .trim("No leading or trailing spaces allowed.")
    .strict(true)
    .email(MESSAGES.email.invalid)
    .required(MESSAGES.email.required),
  password: yup.string().required(MESSAGES.password.required),
});

export const Signin = () => {
  const { addToast } = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    addToast({
      type: "success",
      title: MESSAGES.success.title,
      description: MESSAGES.success.description,
    });
  };

  return (
    <AppSignin>
      <AppInsideSignin>
        <Logo />
        <AppHeadingSignin>
          <h1>Welcome Back</h1>
          <p>Nice to see you again, please enter your details</p>
        </AppHeadingSignin>
        <AppFormSignin onSubmit={handleSubmit(onSubmit)} noValidate>
          <EmailInput
            name="email"
            label="Email Address"
            register={register}
            errors={errors}
            placeholder=""
          />
          <PasswordInput
            name="password"
            label="Password"
            register={register}
            errors={errors}
            placeholder=""
          />
          <AppCheckField>
            <Checkbox
              id="remember"
              name="remember"
              label="Remember Me"
              {...register("remember")}
            />
            <Link to="/">Forgot password?</Link>
          </AppCheckField>
          <AppBtnField>
            <Button>Continue</Button>
          </AppBtnField>
          <AppLinkCover>
            <p>New to Pixelwix University?</p>
            <Link to="/">Create an account</Link>
          </AppLinkCover>
        </AppFormSignin>
      </AppInsideSignin>
    </AppSignin>
  );
};

// for confirm password
{
  /* <PasswordField
  name="confirmPassword"
  label="Confirm Password"
  register={register}
  errors={errors}
  validation={{
    required: "Please confirm your password",
    validate: (val) => val === getValues("password") || "Passwords do not match",
  }}
/> */
}
