import { useEffect, useState } from "react";
import { TopBar } from "../../../components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { TableInfo } from "../../../Shared/Table";
import { AppMainLayoutCover, AppTableDataInformation } from "../style";
import studentData from "../../../data/student.json";

const pagePaths = [
  { label: "Apps", path: "/" },
  { label: "All Students", path: "/" },
];

export const StudentsPage = () => {
  const handleBtnAction = (action, student) => {
    console.log(`Action: ${action}`, student);
  };

  const handleAddItems = (isopen) => {
    console.log(isopen);
  };

  const studentTableData =
    studentData &&
    studentData.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      sec: item.section,
      status: item.mobile % 2 === 0 ? true : false,
      dob: item.dob,
      phone: item.mobile,
      email: item.email,
      gender: item.gender,
      department: item.department,
      parent_name: item.parent_name,
      address: item.address,
    }));

  const tableHeaders =
    studentTableData.length > 0
      ? Object.keys(studentTableData[0]).filter((key) => key !== "image")
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
        parent_name: false,
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
          pageTitle={"Manage Students"}
          pagePath={pagePaths}
          data={studentTableData}
          addTextItem={"Add New Student"}
          handleAddItems={handleAddItems}
          sortableColumns={[
            "id",
            "name",
            "gender",
            "department",
            "dob",
            "status",
          ]}
          viewBtn={"name"}
          enableStatus={true}
          filterableColumns={["gender", "department", "status", "sec"]}
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

// useEffect(() => {
//     const handleResize = () => {
//       setVisibleColumns((prev) => ({
//         ...prev,
//         parent_name: false,
//         address: false,
//       }));
//       // const width = window.innerWidth;
//       // if (width < breakpoints.md) {
//       //   setVisibleColumns((prev) => ({
//       //     ...prev,
//       //     sec: false,
//       //     email: false,
//       //     status: false,
//       //     parent_name: false,
//       //   }));
//       // } else if (width < breakpoints.lg) {
//       //   setVisibleColumns((prev) => ({
//       //     ...prev,
//       //     parent_name: false,
//       //   }));
//       // } else {
//       //   setVisibleColumns((prev) => ({
//       //     ...prev,
//       //   }));
//       // }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
