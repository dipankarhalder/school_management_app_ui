import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { paths } from "../../../Constant";
import { Button } from "../../../Shared/Button";
import { Logo } from "../../../Components/Common/Logo";
import { Input } from "../../../Shared/Input";
import { ToastContext } from "../../../Shared/Toast/context/ToastContext";

import {
  AppSignin,
  AppInsideSignin,
  AppHeadingSignin,
  AppFormSignin,
  AppBtnField,
  AppOtpField,
  AppOtpErrorMessage,
} from "../style";

const MESSAGES = {
  otp: {
    required: "OTP is required.",
    length: "Enter all 4 digits.",
  },
  success: {
    title: "OTP Verified!",
    description: "OTP matched successfully.",
  },
};

const otpSchema = yup.object({
  otp: yup
    .string()
    .required(MESSAGES.otp.required)
    .matches(/^\d{4}$/, MESSAGES.otp.length),
});

export const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleOtpChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const otpArray = otpValue.split("");
    otpArray[index] = value;
    const newOtp = otpArray.join("").padEnd(4, "");
    setValue("otp", newOtp, { shouldValidate: true });

    if (value && index < refs.length - 1) {
      refs[index + 1].current?.focus();
    }
    if (!value && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const renderOtpInputs = () => {
    const otpArray = otpValue.padEnd(4, "").split("");

    return refs.map((ref, i) => (
      <Input
        key={i}
        ref={ref}
        id={`otp-${i}`}
        type="text"
        maxLength={1}
        value={otpArray[i] || ""}
        onChange={(e) => handleOtpChange(i, e)}
        className="otp-input"
        inputMode="numeric"
        pattern="\d*"
        autoFocus={i === 0}
      />
    ));
  };

  const onSubmit = (data) => {
    console.log("OTP Submitted:", data);
    addToast({
      type: "success",
      title: MESSAGES.success.title,
      description: MESSAGES.success.description,
    });
    navigate(paths.APPS);
  };

  return (
    <AppSignin>
      <AppInsideSignin>
        <Logo />
        <AppHeadingSignin>
          <h1>Verify OTP</h1>
          <p>Enter the 4-digit code sent to your email</p>
        </AppHeadingSignin>
        <AppFormSignin onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="otp"
            control={control}
            render={() => <AppOtpField>{renderOtpInputs()}</AppOtpField>}
          />
          {errors.otp && (
            <AppOtpErrorMessage>{errors.otp.message}</AppOtpErrorMessage>
          )}
          <AppBtnField>
            <Button>OTP Verify</Button>
          </AppBtnField>
        </AppFormSignin>
      </AppInsideSignin>
    </AppSignin>
  );
};
