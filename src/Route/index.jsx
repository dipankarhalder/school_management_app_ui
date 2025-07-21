import { createBrowserRouter } from "react-router-dom";

import { Error } from "../Error";
import { paths } from "../Constant";
import { AuthLayout } from "../Pages/Layout/AuthLayout";
import { MainLayout } from "../Pages/Layout/MainLayout";

import { AdministrationPage } from "../Pages/Main/Administration";
import { AdmissionPage } from "../Pages/Main/Admission";
import { AssignmentPage } from "../Pages/Main/Assignments";
import { AttendancePage } from "../Pages/Main/Attendance";
import { AuthorityPage } from "../Pages/Main/Authority";
import { CareerPage } from "../Pages/Main/Career";
import { CertificatesPage } from "../Pages/Main/Certificates";
import { CoursesPage } from "../Pages/Main/Courses";
import { DashboardPage } from "../Pages/Main/Dashboard";
import { EventsPage } from "../Pages/Main/Events";
import { ForgotPasswordPage } from "../Pages/Auth/ForgotPassword";
import { HostelPage } from "../Pages/Main/Hostel";
import { HumanResourcesPage } from "../Pages/Main/HumanResources";
import { InvoicePage } from "../Pages/Main/Invoice";
import { LaboratoryPage } from "../Pages/Main/Laboratory";
import { LocationsPage } from "../Pages/Main/Locations";
import { LibraryPage } from "../Pages/Main/Library";
import { NoticesPage } from "../Pages/Main/Notices";
import { OtpVerificationPage } from "../Pages/Auth/OTP";
import { ProfilePage } from "../Pages/Main/Profile";
import { ReportsPage } from "../Pages/Main/Reports";
import { ResultsPage } from "../Pages/Main/Results";
import { SchedulesPage } from "../Pages/Main/Schedules";
import { ScholarshipsPage } from "../Pages/Main/Scholarships";
import { SettingsPage } from "../Pages/Main/Settings";
import { SigninPage } from "../Pages/Auth/Signin";
import { SignupPage } from "../Pages/Auth/Signup";
import { StocksPage } from "../Pages/Main/Stocks";
import { StudentsPage } from "../Pages/Main/Students";
import { StudyMaterialsPage } from "../Pages/Main/StudyMaterials";
import { StuffPage } from "../Pages/Main/Stuff";
import { TeachersPage } from "../Pages/Main/Teachers";

export const router = createBrowserRouter([
  {
    path: paths.LOGIN,
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <SigninPage />,
      },
      {
        path: paths.REGISTER,
        element: <SignupPage />,
      },
      {
        path: paths.OTP,
        element: <OtpVerificationPage />,
      },
      {
        path: paths.FORGOT,
        element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    path: paths.APPS,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: paths.ADMIN,
        element: <AdministrationPage />,
      },
      {
        path: paths.ADMISSION,
        element: <AdmissionPage />,
      },
      {
        path: paths.ASSIGN,
        element: <AssignmentPage />,
      },
      {
        path: paths.ATTENDANCE,
        element: <AttendancePage />,
      },
      {
        path: paths.AUTH,
        element: <AuthorityPage />,
      },
      {
        path: paths.CAREER,
        element: <CareerPage />,
      },
      {
        path: paths.CERTIFICATE,
        element: <CertificatesPage />,
      },
      {
        path: paths.COURSES,
        element: <CoursesPage />,
      },
      {
        path: paths.EVENTS,
        element: <EventsPage />,
      },
      {
        path: paths.HOSTEL,
        element: <HostelPage />,
      },
      {
        path: paths.HUMAN,
        element: <HumanResourcesPage />,
      },
      {
        path: paths.INVOICE,
        element: <InvoicePage />,
      },
      {
        path: paths.LABORATORY,
        element: <LaboratoryPage />,
      },
      {
        path: paths.LOCATIONS,
        element: <LocationsPage />,
      },
      {
        path: paths.LIBRARY,
        element: <LibraryPage />,
      },
      {
        path: paths.NOTICE,
        element: <NoticesPage />,
      },
      {
        path: paths.REPORT,
        element: <ReportsPage />,
      },
      {
        path: paths.RESULT,
        element: <ResultsPage />,
      },
      {
        path: paths.SCHEDULE,
        element: <SchedulesPage />,
      },
      {
        path: paths.SCHOLAR,
        element: <ScholarshipsPage />,
      },
      {
        path: paths.SETTING,
        element: <SettingsPage />,
      },
      {
        path: paths.STOCK,
        element: <StocksPage />,
      },
      {
        path: paths.STUDENT,
        element: <StudentsPage />,
      },
      {
        path: paths.STUDYMAT,
        element: <StudyMaterialsPage />,
      },
      {
        path: paths.STUFF,
        element: <StuffPage />,
      },
      {
        path: paths.TEACHER,
        element: <TeachersPage />,
      },
      {
        path: paths.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
]);
