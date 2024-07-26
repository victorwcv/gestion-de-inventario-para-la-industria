import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Login from "./pages/login/Login";
import Home from "./pages/home_page/Home";
import Register from "./pages/register/Register";
import System from "./pages/system/System";
import SysHome from "./pages/system/partials/SysHome";
import SysItems from "./pages/system/partials/SysItems";
import SysEpps from "./pages/system/partials/SysEpps";
import SysTools from "./pages/system/partials/SysTools";
import SysWork from "./pages/system/partials/SysWork";
import SysUsers from "./pages/system/partials/SysUsers";


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
            path: "home",
            element: <SysHome />,
          },
          {
            path: "items",
            element: <SysItems />,
          },
          {
            path: "epps",
            element: <SysEpps />,
          },
          {
            path: "tools",
            element: <SysTools />,
          },
          {
            path: "work",
            element: <SysWork />,
          },
          {
            path: "users",
            element: <SysUsers />
          }
        ],
      },
    ],
  },
]);

export default router;
