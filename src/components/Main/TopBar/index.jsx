import { PageHeading } from "../../../components/Shared/Heading";
import { Breadcrumb } from "../../../Shared/Breadcrumb";
import { Rarrow, Info, Notification } from "../../../Shared/Icons";
import { SelectBox } from "../../../Shared/SelectBox";
import {
  AppMainTopCover,
  AppMainItemSection,
  AppLocationDropDown,
  AppMainLeftArea,
  AppMainRightArea,
} from "./style";

export const TopBar = ({ pageName, items, location }) => {
  return (
    <AppMainTopCover>
      <AppMainLeftArea>
        <AppMainItemSection>
          <PageHeading heading={pageName} />
          <Breadcrumb items={items} separator={<Rarrow />} />
        </AppMainItemSection>
        <AppLocationDropDown>
          <SelectBox
            placeholder="Durgapur"
            options={location}
            name={"location_dropdown"}
            id={"location_dropdown"}
          />
        </AppLocationDropDown>
      </AppMainLeftArea>
      <AppMainRightArea>
        <ul>
          <li>
            <Info />
          </li>
          <li>
            <Notification />
          </li>
          <li>
            <img src="/avatar.png" alt="profile" />
          </li>
        </ul>
      </AppMainRightArea>
    </AppMainTopCover>
  );
};
