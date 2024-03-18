import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layout/AppLayout";
import LandingPage from "../pages/JobsPages/LandingPage";
import JobSearchPage from "../pages/JobsPages/JobSearchPage";
import JobDetailsPage from "../pages/JobsPages/JobDetailsPage";
import LoginPage from "../pages/AuthPages/LoginPage";
import SignupPage from "../pages/AuthPages/SignupPage";

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
