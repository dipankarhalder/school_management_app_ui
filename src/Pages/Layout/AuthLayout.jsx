import { Outlet } from "react-router-dom"; // Navigate
// import { MainLogo } from "../components/auth/Logo";
// import { Copyright } from "../components/auth/Copyright";
// import { userRole } from "../constant";
// import { paths } from "../routers/links";
// import { useAuthStore } from "../stores/authStore";

export const AuthLayout = () => {
  // const { isToken, isRole } = useAuthStore();

  // if (isToken && isRole === userRole.SUPER) {
  //   return <Navigate to={paths.adminDashboard} />;
  // } else if (isToken && isRole === userRole.ADMIN) {
  //   return <Navigate to={paths.userDashboard} />;
  // }

  return (
    <div className="app_maincover">
      <div className="app_content">
        <div className="app_content_form">
          {/* <MainLogo /> */}
          <Outlet />
        </div>
        {/* <Copyright /> */}
      </div>
    </div>
  );
};
