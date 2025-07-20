import { TopBar } from "../../../components/Main/TopBar";
import { locationInfo } from "../../../Constant";
import { TableInfo } from "../../../Shared/Table";
import { AppMainLayoutCover } from "../style";
import studentData from "../../../data/student.json";

const pagePaths = [
  { label: "Apps", path: "/" },
  { label: "All Students", path: "/" },
];

export const StudentsPage = () => {
  console.log(studentData);

  return (
    <AppMainLayoutCover>
      <TopBar pageName="Students" items={pagePaths} location={locationInfo} />
      <TableInfo
        data={studentData}
        sortableColumns={["name", "gender", "department", "dob"]}
      />
    </AppMainLayoutCover>
  );
};
