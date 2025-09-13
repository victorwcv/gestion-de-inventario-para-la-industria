import { NavLink, Outlet } from "react-router";
import { Wrench, Package, Settings, FileText, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const nav = [
  { to: "/insumos", label: "Insumos", icon: Package },
  { to: "/herramientas", label: "Herramientas", icon: Wrench },
  { to: "/maquinas", label: "Máquinas", icon: Settings },
  { to: "/mantenimientos", label: "Mantenimientos", icon: FileText },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full bg-muted/50 text-foreground"
      whileTap={{ scale: 0.9 }}
      aria-label="Cambiar tema"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.div>
    </motion.button>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-border">
        <nav className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"}`
                }
              >
                <Icon className="w-5 h-5" />
                {label}
              </NavLink>
            ))}
          </div>
          <ThemeToggle />
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}