import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout";
import LandingPage from "../pages/JobsPages/LandingPage";
import JobSearchPage from "../pages/JobsPages/JobSearchPage";
import JobDetailsPage from "../pages/JobsPages/JobDetailsPage";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
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
]);

export default router;
