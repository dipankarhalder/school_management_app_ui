import { Outlet } from "react-router-dom";
import { AppMainCover, AppBackgroundSec } from "./style";

export const AuthLayout = () => {
  return (
    <AppMainCover>
      <Outlet />
      <AppBackgroundSec />
    </AppMainCover>
  );
};
