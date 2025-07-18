import { Outlet, useLocation } from "react-router-dom";
import { AppMainCover, AppBgSec } from "./style";
import { paths } from "../../../Constant";

const backgroundMap = {
  [paths.LOGIN]: "/authbg.png",
  [`/${paths.REGISTER}`]: "/createbg.png",
  [`/${paths.OTP}`]: "/otpbg.png",
  [`/${paths.FORGOT}`]: "/forgotbg.png",
};

export const AuthLayout = () => {
  const location = useLocation();
  const bgImage = backgroundMap[location.pathname];

  return (
    <AppMainCover>
      <Outlet />
      {bgImage && <AppBgSec $image={bgImage} />}
    </AppMainCover>
  );
};
