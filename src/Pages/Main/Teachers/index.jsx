import { useEffect, useState } from "react";
import { TopBar } from "../../../components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { TableInfo } from "../../../Shared/Table";
import { AppMainLayoutCover, AppTableDataInformation } from "../style";
import teacherData from "../../../data/teacher.json";

const pagePaths = [
  { label: "Apps", path: "/" },
  { label: "All Teachers", path: "/" },
];

export const TeachersPage = () => {
  const handleBtnAction = (action, student) => {
    console.log(`Action: ${action}`, student);
  };

  const teacherTableData =
    teacherData &&
    teacherData.map((item) => ({
      id: item.id,
      image: item.image,
      name: item.name,
      gender: item.gender,
      sec: item.section,
      subject: item.subject,
      class: item.class,
      status: item.mobile % 2 === 0 ? true : false,
      dob: item.DOB,
      phone: item.mobile,
      email: item.email,
      address: item.address,
    }));

  const tableHeaders =
    teacherTableData.length > 0
      ? Object.keys(teacherTableData[0]).filter((key) => key !== "image")
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
        dob: false,
        address: false,
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
          pageTitle={"Manage Teachers"}
          pagePath={pagePaths}
          data={teacherTableData}
          sortableColumns={[
            "id",
            "name",
            "gender",
            "status",
            "phone",
            "subject",
          ]}
          viewBtn={"name"}
          enableStatus={true}
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
