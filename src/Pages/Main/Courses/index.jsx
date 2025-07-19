import { TopBar } from "../../../components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { AppMainLayoutCover } from "../style";

const pagePaths = [
  { label: "Apps", path: "/" },
  { label: "All Courses", path: "/" },
];

export const CoursesPage = () => {
  return (
    <AppMainLayoutCover>
      <TopBar
        pageName="All Courses"
        items={pagePaths}
        location={locationInfo}
      />
      <p>CoursesPage</p>
    </AppMainLayoutCover>
  );
};
