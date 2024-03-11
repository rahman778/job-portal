import { createBrowserRouter } from "react-router-dom";
import Nav from "../components/Nav/Nav";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Nav />,
   },
]);

export default router;
