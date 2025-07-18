import { createBrowserRouter } from "react-router-dom";

import { Error } from "../Error";
import { paths } from "../Constant";
import { AuthLayout } from "../Pages/Layout/AuthLayout";
import { MainLayout } from "../Pages/Layout/MainLayout";

import { SigninPage } from "../Pages/Auth/Signin";
import { SignupPage } from "../Pages/Auth/Signup";
import { OtpVerificationPage } from "../Pages/Auth/OTP";
import { ForgotPasswordPage } from "../Pages/Auth/ForgotPassword";
import { DashboardPage } from "../Pages/Main/Dashboard";
import { ProfilePage } from "../Pages/Main/Profile";

export const router = createBrowserRouter([
  {
    path: paths.LOGIN,
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <SigninPage />,
      },
      {
        path: paths.REGISTER,
        element: <SignupPage />,
      },
      {
        path: paths.OTP,
        element: <OtpVerificationPage />,
      },
      {
        path: paths.FORGOT,
        element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    path: paths.APPS,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: paths.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
]);
