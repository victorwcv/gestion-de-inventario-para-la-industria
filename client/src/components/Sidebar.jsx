import { NavLink } from "react-router-dom";
import Button from "./Button";

const options = [
  // {
  //   label: "Inicio",
  //   to: "/system/home",
  // },
  {
    label: "Materiales",
    to: "/system/materials",
  },
  {
    label: "EPPs",
    to: "/system/epps",
  },
  {
    label: "Herramientas",
    to: "/system/tools",
  },
];

const SidebarLink = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        isPending ? "text-blue-300" : isActive ? "text-blue-500" : ""
      }
    >
      {label}
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <aside className="absolute top-0 w-64 h-screen bg-slate-500 text-white p-4">
      <Button label={"x"} />
      <nav>
        <ul>
          {options.map(({ label, to }, index) => (
            <li key={index}>
              <SidebarLink to={to} label={label} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
