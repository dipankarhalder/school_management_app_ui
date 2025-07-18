import { createBrowserRouter } from "react-router-dom";

import { Error } from "../Error";
import { paths } from "../Constant";
import { AuthLayout } from "../Pages/Layout/AuthLayout";

import { Signin } from "../Pages/Auth/Signin";
import { Signup } from "../Pages/Auth/Signup";
import { OtpVerification } from "../Pages/Auth/OTP";
import { ForgotPassword } from "../Pages/Auth/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: paths.LOGIN,
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Signin />,
      },
      {
        path: paths.REGISTER,
        element: <Signup />,
      },
      {
        path: paths.OTP,
        element: <OtpVerification />,
      },
      {
        path: paths.FORGOT,
        element: <ForgotPassword />,
      },
    ],
  },
]);
