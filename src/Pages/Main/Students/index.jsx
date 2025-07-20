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
  const handleStudentAction = (action, student) => {
    console.log(`Action: ${action}`, student);
  };

  return (
    <AppMainLayoutCover>
      <TopBar pageName="Students" items={pagePaths} location={locationInfo} />
      <AppTableDataInformation>
        <TableInfo
          data={studentData}
          sortableColumns={["name", "gender", "department", "dob"]}
          enableStatus={true}
          onAction={handleStudentAction}
        />
      </AppTableDataInformation>
    </AppMainLayoutCover>
  );
};
