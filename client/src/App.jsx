import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';

import { store } from "./store";

import router from "./router";

function App() {
   return (
      <Provider store={store}>
         <ThemeProvider attribute="class">
            <RouterProvider router={router} />
            <Toaster />
         </ThemeProvider>
      </Provider>
   );
}

export default App;
