import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Login from "./pages/login/Login";
import Home from "./pages/home_page/Home";
import Register from "./pages/register/Register";
import System from "./pages/system/System";
import System_materials from "./pages/system/outlet/System_materials";
import System_epps from "./pages/system/outlet/System_epps";
import System_tools from "./pages/system/outlet/System_tools";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "system",
        element: <System />,
        children: [
          {
            path: "materials",
            element: <System_materials />,
          },
          {
            path: "epps",
            element: <System_epps />,
          },
          {
            path: "tools",
            element: <System_tools />,
          },
        ],
      },
    ],
  },
]);

export default router;
