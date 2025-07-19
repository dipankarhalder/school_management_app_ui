import { TopBar } from "../../../components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { AppMainLayoutCover } from "../style";

const pagePaths = [{ label: "..Apps", path: "/" }];

export const DashboardPage = () => {
  return (
    <AppMainLayoutCover>
      <TopBar pageName="Dashboard" items={pagePaths} location={locationInfo} />
      <p>DashboardPage</p>
    </AppMainLayoutCover>
  );
};
