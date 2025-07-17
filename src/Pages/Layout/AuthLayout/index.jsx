import { Outlet } from "react-router-dom";
import { AppMainCover, AppContent, AppBackgroundSec } from "./style";

export const AuthLayout = () => {
  return (
    <AppMainCover>
      <AppContent>
        <Outlet />
        <AppBackgroundSec />
      </AppContent>
    </AppMainCover>
  );
};
