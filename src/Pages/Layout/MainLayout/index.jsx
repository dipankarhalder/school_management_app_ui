import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../Components/Main/Sidebar";
import { AppLayoutCover, AppContentArea } from "./style";

export const MainLayout = () => {
  return (
    <AppLayoutCover>
      <Sidebar />
      <AppContentArea>
        <Outlet />
      </AppContentArea>
    </AppLayoutCover>
  );
};
