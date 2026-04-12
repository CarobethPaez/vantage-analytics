import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/",         label: "Dashboard", icon: "▦" },
  { to: "/reports",  label: "Reportes",  icon: "↗" },
  { to: "/settings", label: "Ajustes",   icon: "⚙" },
];

export const Sidebar = () => (
  <aside
    style={{ background: "var(--bg-sidebar)", borderRight: "0.5px solid var(--border-nav)" }}
    className="w-52 shrink-0 h-screen flex flex-col"
  >
    <div
      style={{ borderBottom: "0.5px solid var(--border-nav)" }}
      className="px-5 py-4"
    >
      <span style={{ color: "var(--text-primary)" }} className="text-sm font-semibold">
        Vantage
      </span>
      <span style={{ color: "var(--text-muted)" }} className="text-sm ml-1">
        analytics
      </span>
    </div>

    <nav className="flex-1 px-3 py-3 space-y-0.5">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          style={({ isActive }) =>
            isActive
              ? {
                  background: "rgba(99,130,255,0.15)",
                  color: "#a0b4ff",
                  border: "0.5px solid rgba(99,130,255,0.2)",
                }
              : { color: "var(--text-muted)" }
          }
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors hover:text-blue-300"
        >
          <span className="text-sm leading-none">{icon}</span>
          {label}
        </NavLink>
      ))}
    </nav>

    <div
      style={{ borderTop: "0.5px solid var(--border-nav)" }}
      className="px-4 py-4"
    >
      <div className="flex items-center gap-3">
        <div
          style={{ background: "rgba(99,130,255,0.2)", color: "#a0b4ff" }}
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
        >
          TU
        </div>
        <div className="min-w-0">
          <p style={{ color: "var(--text-secondary)" }} className="text-xs font-medium truncate">
            Tu cuenta
          </p>
          <p style={{ color: "var(--text-muted)" }} className="text-xs truncate">
            Plan gratuito
          </p>
        </div>
      </div>
    </div>
  </aside>
);