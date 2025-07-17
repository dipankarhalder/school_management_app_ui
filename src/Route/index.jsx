import { createBrowserRouter } from "react-router-dom";

// error and routes
import { Error } from "../Error";
import { pathItems } from "../Constant";

// super admin layout
import { AuthLayout } from "../Pages/Layout/AuthLayout";

// super admin auth
import { Signin } from "../Pages/Auth/Signin";
import { Signup } from "../Pages/Auth/Signup";

export const router = createBrowserRouter([
  {
    path: pathItems.login,
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Signin />,
      },
      {
        path: pathItems.register,
        element: <Signup />,
      },
    ],
  },
]);
