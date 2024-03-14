import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";

import router from "./router";

function App() {
   return (
      <ThemeProvider attribute="class">
         <RouterProvider router={router} />
      </ThemeProvider>
   );
}

export default App;
