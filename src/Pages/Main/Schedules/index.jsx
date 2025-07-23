import { TopBar } from "../../../Components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { Calendar } from "../../../Shared/Calendar";
import { Breadcrumb } from "../../../Shared/Breadcrumb";
import { Rarrow } from "../../../Shared/Icons";
import scheduleData from "../../../data/schedule.json";
import {
  AppMainLayoutCover,
  AppTableDataInformation,
  ApplicationCoverContainer,
  AppMainPageHeading,
  AppContentDiv,
} from "../style";

const pagePaths = [
  { label: "Apps", path: "/" },
  { label: "All Schedules", path: "/" },
];

export const SchedulesPage = () => {
  const pageTitle = "Manage Schedules";

  return (
    <AppMainLayoutCover>
      <TopBar location={locationInfo} />
      <AppTableDataInformation>
        <ApplicationCoverContainer>
          <AppMainPageHeading>
            <h1>{pageTitle}</h1>
            <Breadcrumb items={pagePaths} separator={<Rarrow />} />
          </AppMainPageHeading>
          <AppContentDiv>
            <Calendar dataInfo={scheduleData} />
          </AppContentDiv>
        </ApplicationCoverContainer>
      </AppTableDataInformation>
    </AppMainLayoutCover>
  );
};
