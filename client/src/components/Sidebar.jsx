import { NavLink } from "react-router-dom";
import icons from "../icons/icons";
import { useState } from "react";

// This is an object that contains the options for the sidebar.
// Edit this object to add or remove options.
const options = [
  {
    label: "Inicio",
    to: "/system/home",
    icon: icons.home,
  },
  {
    label: "Materiales",
    to: "/system/items",
    icon: icons.clipboard,
  },
  {
    label: "EPPs",
    to: "/system/epps",
    icon: icons.hat,
  },
  {
    label: "Herramientas",
    to: "/system/tools",
    icon: icons.tool,
  },
  {
    label: "Trabajos",
    to: "/system/work",
    icon: icons.toolBox,
  },
  {
    label: "Usuarios",
    to: "/system/users",
    icon: icons.user,
  },
];

// This is a functional component that creates a link for the sidebar.
// It is used in the Sidebar component.
const SidebarLink = ({ to, label, icon, isOpen }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-[var(--color-accent)] hover:text-[var(--color-background)]"
          : ""
      }
    >
      <div
        className={`flex items-center gap-4 hover:bg-[var(--color-accent)] py-6 w-full transition-all
          ${isOpen ? "px-10" : "px-3"}`}
        title={label}
      >
        <span className="text-4xl">{icon}</span>
        {isOpen && <span>{label}</span>}
      </div>
    </NavLink>
  );
};

// This is a functional component that creates the sidebar.
// It is used in the App component.
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="fixed top-0 left-0 z-50">
      <div
        className={` ${
          isOpen ? "w-72" : "w-16"
        } relative min-h-dvh bg-[var(--color-primary)] text-[var(--color-background)] transition-all duration-500 overflow-hidden 
        `}
      >
        <div className="relative w-full h-20">
          <button
            onClick={toggleSidebar}
            className="right-3 top-6 absolute text-4xl hover:scale-90"
          >
            {isOpen ? icons.arrowLeft : icons.arrowRight}
          </button>
        </div>
        <nav>
          <div className="flex flex-col align-center">
            {options.map(({ label, to, icon }, index) => (
              <SidebarLink
                key={index}
                to={to}
                label={label}
                icon={icon}
                isOpen={isOpen}
              />
            ))}
          </div>
        </nav>
        <button className="right-5 bottom-6 absolute">
          <div className="flex items-center gap-4 w-full hover:scale-95 transition-all duration-300">
            {isOpen && <span>Salir</span>}
            <span className="rotate-180 text-3xl">{icons.signOut}</span>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
