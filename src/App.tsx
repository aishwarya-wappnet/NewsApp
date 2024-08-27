import { RouterProvider } from "react-router-dom";

import "./App.css";
import { AppRoutes } from "./routes";
import useAos from "./hooks/useAos";

function App() {
  useAos();
  return <RouterProvider router={AppRoutes} />;
}

export default App;
