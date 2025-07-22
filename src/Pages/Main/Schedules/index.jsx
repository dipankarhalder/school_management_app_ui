import { TopBar } from "../../../components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { Calendar } from "../../../Shared/Calendar";
import { AppMainLayoutCover, AppTableDataInformation } from "../style";

export const SchedulesPage = () => {
  return (
    <AppMainLayoutCover>
      <TopBar location={locationInfo} />
      <AppTableDataInformation>
        <Calendar />
      </AppTableDataInformation>
    </AppMainLayoutCover>
  );
};
