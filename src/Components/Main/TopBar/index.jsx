import { Info, Notification, Location, Darrow } from "../../../Shared/Icons";
import { SelectBox } from "../../../Shared/SelectBox";
import {
  AppMainTopCover,
  AppLocationDropDown,
  AppLoginTime,
  AppDropDownItem,
  AppMainLeftArea,
  AppMainRightArea,
} from "./style";

export const TopBar = ({ location }) => {
  return (
    <AppMainTopCover>
      <AppMainLeftArea>
        <AppLocationDropDown>
          <Location />
          <AppDropDownItem>
            <SelectBox
              placeholder="Durgapur"
              options={location}
              name={"location_dropdown"}
              id={"location_dropdown"}
            />
            <Darrow />
          </AppDropDownItem>
        </AppLocationDropDown>
        <AppLoginTime>
          <span>Last Login: 23-04-2025, 12:30 PM</span>
        </AppLoginTime>
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
