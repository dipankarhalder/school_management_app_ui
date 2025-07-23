import { useEffect, useState } from "react";
import { TopBar } from "../../../Components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { TableInfo } from "../../../Shared/Table";
import { AppMainLayoutCover, AppTableDataInformation } from "../style";
import noticeData from "../../../data/notice.json";

const pagePaths = [
  { label: "Apps", path: "/" },
  { label: "All Norices", path: "/" },
];

export const NoticesPage = () => {
  const handleBtnAction = (action, location) => {
    console.log(`Action: ${action}`, location);
  };

  const handleAddItems = (isopen) => {
    console.log(isopen);
  };

  const noticeTableData =
    noticeData &&
    noticeData.map((item) => ({
      id: item.id,
      title: item.title,
      date_posted: item.date_posted,
      valid_until: item.valid_until,
      priority: item.priority,
      author: item.author.name,
      role: item.author.role,
      audience: item.audience.map((itm) => `${itm}, `),
      description: item.description,
    }));

  const tableHeaders =
    noticeTableData.length > 0
      ? Object.keys(noticeTableData[0]).filter((key) => key !== "image")
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
        description: false,
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
          pageTitle={"Manage Noticeboard"}
          pagePath={pagePaths}
          data={noticeTableData}
          addTextItem={"Add New Notice"}
          handleAddItems={handleAddItems}
          sortableColumns={["id", "name", "code", "gender"]}
          viewBtn={"name"}
          enableStatus={true}
          filterableColumns={["priority", "author"]}
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
