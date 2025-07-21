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

  // const handle

  const studentTableData =
    studentData &&
    studentData.map((item) => ({
      id: item.id,
      name: item.name,
      section: item.section,
      status: item.mobile % 2 === 0 ? true : false,
      dob: item.dob,
      gender: item.gender,
      phone: item.mobile,
      email: item.email,
      department: item.department,
      parent_name: item.parent_name,
    }));

  return (
    <AppMainLayoutCover>
      <TopBar location={locationInfo} />
      <AppTableDataInformation>
        <TableInfo
          pageTitle={"Manage Students"}
          pagePath={pagePaths}
          data={studentTableData}
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
          onAction={handleBtnAction}
        />
      </AppTableDataInformation>
    </AppMainLayoutCover>
  );
};
