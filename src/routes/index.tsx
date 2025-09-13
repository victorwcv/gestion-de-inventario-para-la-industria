import { createBrowserRouter } from "react-router";
import Layout from "@/shared/components/Layout";
import ConsumablesPage from "@/modules/consumables/pages/ConsumablesPage";
import ToolsPage from "@/modules/tools/pages/ToolsPage";
import MachinesPage from "@/modules/machines/pages/MachinesPage";
import MaintenancePage from "@/modules/maintenance/pages/MaintenancePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "insumos", element: <ConsumablesPage /> },
      { path: "herramientas", element: <ToolsPage /> },
      { path: "maquinas", element: <MachinesPage /> },
      { path: "mantenimientos", element: <MaintenancePage /> },
    ],
  },
]);