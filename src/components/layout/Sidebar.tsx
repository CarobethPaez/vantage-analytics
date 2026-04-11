import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/",        label: "Dashboard",  icon: "▦" },
  { to: "/reports", label: "Reportes",   icon: "↗" },
  { to: "/settings",label: "Ajustes",    icon: "⚙" },
];

export const Sidebar = () => (
  <aside className="w-56 shrink-0 h-screen border-r border-gray-100 flex flex-col bg-white">
    <div className="px-5 py-5 border-b border-gray-100">
      <span className="text-base font-semibold tracking-tight text-gray-900">
        Vantage
      </span>
      <span className="ml-1 text-base text-gray-400">analytics</span>
    </div>

    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`
          }
        >
          <span className="text-base leading-none">{icon}</span>
          {label}
        </NavLink>
      ))}
    </nav>

    <div className="px-4 py-4 border-t border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-medium text-indigo-700">
          TU
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-800 truncate">Tu cuenta</p>
          <p className="text-xs text-gray-400 truncate">Plan gratuito</p>
        </div>
      </div>
    </div>
  </aside>
);