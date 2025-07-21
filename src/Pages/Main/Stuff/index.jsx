import { useEffect, useState } from "react";
import { TopBar } from "../../../components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { TableInfo } from "../../../Shared/Table";
import { AppMainLayoutCover, AppTableDataInformation } from "../style";
import stuffData from "../../../data/stuff.json";

const pagePaths = [
  { label: "Apps", path: "/" },
  { label: "All Stuffs", path: "/" },
];

export const StuffPage = () => {
  const handleBtnAction = (action, location) => {
    console.log(`Action: ${action}`, location);
  };

  const handleAddItems = (isopen) => {
    console.log(isopen);
  };

  const stuffTableData =
    stuffData &&
    stuffData.map((item) => ({
      id: item.id,
      image: item.image,
      name: item.name,
      gender: item.gender,
      mobile: item.mobile,
      DOB: item.DOB,
      designation: item.designation,
      blood_group: item.blood_group,
      college_name: item.college_name,
      address: item.address,
    }));

  const tableHeaders =
    stuffTableData.length > 0
      ? Object.keys(stuffTableData[0]).filter((key) => key !== "image")
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
        gender: false,
        blood_group: false,
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
          pageTitle={"Manage Stuffs"}
          pagePath={pagePaths}
          data={stuffTableData}
          addTextItem={"Add New Stuff"}
          handleAddItems={handleAddItems}
          sortableColumns={["id", "name", "code", "gender"]}
          viewBtn={"name"}
          enableStatus={true}
          filterableColumns={["gender", "designation", "college_name"]}
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
