import { TopBar } from "../../../Components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { AppMainLayoutCover } from "../style";

const pagePaths = [
  { label: "Apps", path: "/" },
  { label: "Admission", path: "/" },
];

export const AdmissionPage = () => {
  return (
    <AppMainLayoutCover>
      <TopBar pageName="Admission" items={pagePaths} location={locationInfo} />
      <p>AdmissionPage</p>
    </AppMainLayoutCover>
  );
};
