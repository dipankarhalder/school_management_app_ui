import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../../../Shared/Input";
import { Checkbox } from "../../../Shared/Checkbox";
import { Button } from "../../../Shared/Button";
import { Logo } from "../../../components/common/Logo";
import { ToastContext } from "../../../Shared/Toast/context/ToastContext";
import {
  AppSignin,
  AppInsideSignin,
  AppHeadingSignin,
  AppFormSignin,
  AppFromField,
  AppCheckField,
  AppFormLabel,
  AppErrorMessage,
  AppBtnField,
  AppLinkCover,
} from "./style";

export const Signin = () => {
  const { addToast } = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    addToast({
      type: "success",
      title: "Signed In!",
      description: "You have successfully signed in.",
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
          <AppFromField>
            <AppFormLabel htmlFor="username">Username</AppFormLabel>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
              aria-invalid={errors.username ? "true" : "false"}
              aria-describedby="username-error"
            />
            {errors.username && (
              <AppErrorMessage id="username-error">
                {errors.username.message}
              </AppErrorMessage>
            )}
          </AppFromField>
          <AppFromField>
            <AppFormLabel htmlFor="password">Password</AppFormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby="password-error"
            />
            {errors.password && (
              <AppErrorMessage id="password-error">
                {errors.password.message}
              </AppErrorMessage>
            )}
          </AppFromField>
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
