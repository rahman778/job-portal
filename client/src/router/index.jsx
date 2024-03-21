import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layout/AppLayout";
import LandingPage from "../pages/JobsPages/LandingPage";
import JobSearchPage from "../pages/JobsPages/JobSearchPage";
import JobDetailsPage from "../pages/JobsPages/JobDetailsPage";
import LoginPage from "../pages/AuthPages/LoginPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import JobListingPage from "../pages/DashboardPages/JobListingPage";
import JobCreatePage from "../pages/DashboardPages/JobCreatePage";
import JobManagePage from "../pages/DashboardPages/JobManagePage";
import UserProfile from "../pages/ProfilePages/UserProfilePage";
import CompanyProfile from "../pages/ProfilePages/CompanyProfilePage";

const router = createBrowserRouter([
   {
      path: "/",
      element: <AppLayout />,
      children: [
         {
            path: "",
            element: <LandingPage />,
         },
         {
            path: "search",
            element: <JobSearchPage />,
         },
         {
            path: "job/:jobId",
            element: <JobDetailsPage />,
         },
         {
            path: "profile",
            element: <UserProfile />,
         },
         {
            path: "company/",
            element: <JobListingPage />,
         },
         {
            path: "company/job/create",
            element: <JobCreatePage />,
         },
         {
            path: "company/job/manage",
            element: <JobManagePage />,
         },
         {
            path: "company/profile",
            element: <CompanyProfile  />,
         },
      ],
   },
   {
      path: "/login",
      element: <LoginPage />,
   },
   {
      path: "/signup",
      element: <SignupPage />,
   },
]);

export default router;
