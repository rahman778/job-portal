import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout";
import LandingPage from "../pages/JobsPages/LandingPage";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         {
            path: "",
            element: <LandingPage />,
         },
      ],
   },
]);

export default router;
