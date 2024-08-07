import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layout/AppLayout";
import RecentJobsPage from "../pages/JobsPages/RecentJobsPage.jsx";
import JobSearchPage from "../pages/JobsPages/JobSearchPage";
import JobDetailsPage from "../pages/JobsPages/JobDetailsPage";
import LoginPage from "../pages/AuthPages/LoginPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import JobListingPage from "../pages/DashboardPages/JobListingPage";
import JobCreatePage from "../pages/DashboardPages/JobCreatePage";
import JobManagePage from "../pages/DashboardPages/JobManagePage";
import UserProfile from "../pages/ProfilePages/UserProfilePage";
import CompanyProfile from "../pages/ProfilePages/CompanyProfilePage";
import JobsLayout from "../layout/JobsLayout";
import SuggestedJobsPage from "../pages/JobsPages/SuggestedJobsPage.jsx";
import SavedJobsPage from "../pages/JobsPages/SavedJobsPage.jsx";
import VerifyPage from "../pages/AuthPages/VerifyPage.jsx";

const router = createBrowserRouter([
   {
      path: "/",
      element: <AppLayout />,
      children: [
         {
            path: "",
            element: <JobsLayout />,
            children: [
               {
                  path: "recent-jobs",
                  element: <RecentJobsPage />,
               },
               {
                  path: "suggested-jobs",
                  element: <SuggestedJobsPage />,
               },
               {
                  path: "saved-jobs",
                  element: <SavedJobsPage />,
               },
            ],
         },
         {
            path: "jobs",
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
            path: "company",
            element: <JobListingPage />,
         },
         {
            path: "company/:companyId/job/create",
            element: <JobCreatePage />,
         },
         {
            path: "company/:companyId/job/:jobId",
            element: <JobCreatePage />,
         },
         {
            path: "company/job/manage",
            element: <JobManagePage />,
         },
         {
            path: "company/profile",
            element: <CompanyProfile />,
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
   {
      path: "/verify/:token",
      element: <VerifyPage />,
   },
]);

export default router;
