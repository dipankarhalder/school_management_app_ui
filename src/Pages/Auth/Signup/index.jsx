import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { paths } from "../../../Constant";
import { Button } from "../../../Shared/Button";
import { Checkbox } from "../../../Shared/Checkbox";
import { EmailInput } from "../../../components/Shared/FormElements/EmailInput";
import { PasswordInput } from "../../../components/Shared/FormElements/PasswordInput";
import { TextInput } from "../../../components/Shared/FormElements/TextInput";
import { PhoneInput } from "../../../components/Shared/FormElements/PhoneInput";
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
  name: { required: "Please enter your name." },
  phone: { required: "Please enter your phone number." },
  email: {
    required: "Please enter your email.",
    invalid: "This doesn't look like a valid email.",
  },
  password: { required: "Please set a password." },
  policy: { required: "You must accept our terms and privacy policy." },
  success: {
    title: "Account Created!",
    description: "You have successfully signed up.",
  },
};

const signupSchema = yup.object({
  name: yup.string().required(MESSAGES.name.required),
  phone: yup
    .object({
      countryCode: yup.string().required(),
      number: yup
        .string()
        .required(MESSAGES.phone.required)
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .matches(/^[1-9]\d{9}$/, "Phone number cannot start with 0"),
    })
    .required(),
  email: yup
    .string()
    .email(MESSAGES.email.invalid)
    .required(MESSAGES.email.required),
  password: yup.string().required(MESSAGES.password.required),
  policy: yup.boolean().oneOf([true], MESSAGES.policy.required),
});

export const Signup = () => {
  const { addToast } = useContext(ToastContext);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      phone: { countryCode: "+91", number: "" },
      policy: true,
    },
  });

  const inputs = [
    {
      name: "name",
      label: "Name",
      component: TextInput,
      props: { register, errors },
    },
    {
      name: "phone",
      label: "Phone Number",
      component: PhoneInput,
      props: { control, errors, setValue },
    },
    {
      name: "email",
      label: "Email Address",
      component: EmailInput,
      props: { register, errors },
    },
    {
      name: "password",
      label: "Password",
      component: PasswordInput,
      props: { register, errors },
    },
  ];

  const onSubmit = (data) => {
    console.log("Signup Form Data:", data);
    addToast({
      type: "success",
      title: MESSAGES.success.title,
      description: MESSAGES.success.description,
    });
  };

  return (
    <AppSignin>
      <AppInsideSignin>
        <AppHeadingSignin>
          <h1>Create an Account</h1>
          <p>Let's get you started with Pixelwix University</p>
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
              id="policy"
              name="policy"
              label={
                <>
                  I agree to the <Link to="/terms">Terms</Link> and{" "}
                  <Link to="/privacy">Privacy Policy</Link>.
                </>
              }
              {...register("policy")}
            />
          </AppCheckField>
          <AppBtnField>
            <Button>Create Account</Button>
          </AppBtnField>
          <AppLinkCover>
            <p>Already have an account?</p>
            <Link to={paths.LOGIN}>Sign in</Link>
          </AppLinkCover>
        </AppFormSignin>
      </AppInsideSignin>
    </AppSignin>
  );
};
