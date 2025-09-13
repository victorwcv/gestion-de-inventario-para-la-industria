import { Outlet, NavLink } from "react-router";
import { Wrench, Package, Settings, FileText } from "lucide-react";

const nav = [
  { to: "/insumos", label: "Insumos", icon: Package },
  { to: "/herramientas", label: "Herramientas", icon: Wrench },
  { to: "/maquinas", label: "Máquinas", icon: Settings },
  { to: "/mantenimientos", label: "Mantenimientos", icon: FileText },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <nav className="flex gap-4 p-4">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}