import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive, isPending }) =>
                isPending ? "text-blue-300" : isActive ? "text-blue-500" : ""
              }
            >
              Panel de Control
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inventory"
              className={({ isActive, isPending }) =>
                isPending ? "text-blue-300" : isActive ? "text-blue-500" : ""
              }
            >
              Inventario
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/supliers"
              className={({ isActive, isPending }) =>
                isPending ? "text-blue-300" : isActive ? "text-blue-500" : ""
              }
            >
              Proveedores
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive, isPending }) =>
                isPending ? "text-blue-300" : isActive ? "text-blue-500" : ""
              }
            >
              Reportes
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
