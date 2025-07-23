import { TopBar } from "../../../Components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { AppMainLayoutCover } from "../style";

const pagePaths = [
  { label: "Apps", path: "/" },
  { label: "Administration", path: "/" },
];

export const AdministrationPage = () => {
  return (
    <AppMainLayoutCover>
      <TopBar
        pageName="Administration"
        items={pagePaths}
        location={locationInfo}
      />
      <p>AdministrationPage</p>
    </AppMainLayoutCover>
  );
};
