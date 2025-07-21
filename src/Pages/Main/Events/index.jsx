import { useEffect, useState } from "react";
import { TopBar } from "../../../components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { TableInfo } from "../../../Shared/Table";
import { AppMainLayoutCover, AppTableDataInformation } from "../style";
import eventData from "../../../data/events.json";

const pagePaths = [
  { label: "Apps", path: "/" },
  { label: "All Events", path: "/" },
];

export const EventsPage = () => {
  const handleBtnAction = (action, location) => {
    console.log(`Action: ${action}`, location);
  };

  const handleAddItems = (isopen) => {
    console.log(isopen);
  };

  const eventTableData =
    eventData &&
    eventData.map((item) => ({
      id: item.id,
      name: item.name,
      registration: item.registration_required ? "Required" : "Not Required",
      department: item.department,
      organizer: item.organizer,
      location: item.location,
      date: `${item.date} - ${item.time}`,
      duration: item.duration,
      audience: item.audience.map((itm) => `${itm}, `),
    }));

  const tableHeaders =
    eventTableData.length > 0
      ? Object.keys(eventTableData[0]).filter((key) => key !== "image")
      : [];

  const [visibleColumns, setVisibleColumns] = useState(() =>
    tableHeaders.reduce((acc, col) => {
      acc[col] = true;
      return acc;
    }, {})
  );

  useEffect(() => {
    const handleResize = () => {
      setVisibleColumns((prev) => ({
        ...prev,
        duration: false,
        audience: false,
      }));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppMainLayoutCover>
      <TopBar location={locationInfo} />
      <AppTableDataInformation>
        <TableInfo
          pageTitle={"Manage Events"}
          pagePath={pagePaths}
          data={eventTableData}
          addTextItem={"Add New Event"}
          handleAddItems={handleAddItems}
          sortableColumns={["id", "name", "code", "status"]}
          viewBtn={"name"}
          enableStatus={true}
          filterableColumns={["registration", "organizer", "department"]}
          visibleColumns={visibleColumns}
          onToggleColumn={(col) =>
            setVisibleColumns((prev) => ({
              ...prev,
              [col]: !prev[col],
            }))
          }
          onAction={handleBtnAction}
        />
      </AppTableDataInformation>
    </AppMainLayoutCover>
  );
};
