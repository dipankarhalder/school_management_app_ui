import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { paths } from "../../../Constant";
import { Button } from "../../../Shared/Button";
import { Checkbox } from "../../../Shared/Checkbox";
import { Logo } from "../../../Components/Common/Logo";
import { EmailInput } from "../../../Components/Shared/FormElements/EmailInput";
import { PasswordInput } from "../../../Components/Shared/FormElements/PasswordInput";
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
    title: "Successfully Submitted",
    description: "You are a authorized user.",
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

export const SigninPage = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const inputs = [
    {
      name: "email",
      label: "Email Address",
      component: EmailInput,
      props: { register, errors, placeholder: "" },
    },
    {
      name: "password",
      label: "Password",
      component: PasswordInput,
      props: { register, errors, placeholder: "" },
    },
  ];

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    addToast({
      type: "success",
      title: MESSAGES.success.title,
      description: MESSAGES.success.description,
    });
    navigate(paths.OTP);
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
          {inputs.map((input) => {
            const Component = input.component;
            return (
              <Component
                key={input.name}
                name={input.name}
                label={input.label}
                {...input.props}
              />
            );
          })}
          <AppCheckField>
            <Checkbox
              id="remember"
              name="remember"
              label="Remember Me"
              {...register("remember")}
            />
            <Link to={paths.FORGOT}>Forgot password?</Link>
          </AppCheckField>
          <AppBtnField>
            <Button>Continue</Button>
          </AppBtnField>
          <AppLinkCover>
            <p>New to Pixelwix University?</p>
            <Link to={paths.REGISTER}>Create an account</Link>
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
