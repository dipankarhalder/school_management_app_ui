import { Logo } from "../../../components/common/Logo";
import { AppSignin, AppInsideSignin, AppHeadingSignin } from "./style";

export const Signin = () => {
  return (
    <AppSignin>
      <AppInsideSignin>
        <Logo />
        <AppHeadingSignin>
          <h1>Welcome Back</h1>
          <p>Enter your email and password to access your account</p>
        </AppHeadingSignin>
      </AppInsideSignin>
    </AppSignin>
  );
};
