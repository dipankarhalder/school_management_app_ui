import { useEffect, useState } from "react";
import { TopBar } from "../../../Components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { TableInfo } from "../../../Shared/Table";
import { AppMainLayoutCover, AppTableDataInformation } from "../style";
import locationData from "../../../data/location.json";

const pagePaths = [
  { label: "Apps", path: "/" },
  { label: "All Locations", path: "/" },
];

export const LocationsPage = () => {
  const handleBtnAction = (action, location) => {
    console.log(`Action: ${action}`, location);
  };

  const handleAddItems = (isopen) => {
    console.log(isopen);
  };

  const locationTableData =
    locationData &&
    locationData.map((item) => ({
      id: item.id,
      name: item.location_name,
      code: item.location_code,
      principal: item.location_principal,
      contact: item.contact_no,
      status: item.status,
      established: item.create_date,
      address: item.location_address,
    }));

  const tableHeaders =
    locationTableData.length > 0
      ? Object.keys(locationTableData[0]).filter((key) => key !== "image")
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
        established: false,
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
          pageTitle={"Manage Locations"}
          pagePath={pagePaths}
          data={locationTableData}
          addTextItem={"Add New Location"}
          handleAddItems={handleAddItems}
          sortableColumns={["id", "name", "code", "status"]}
          viewBtn={"name"}
          enableStatus={true}
          filterableColumns={["status"]}
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
