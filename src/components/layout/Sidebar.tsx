import { NavLink } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const navItems = [
  { to: "/app",          label: "Dashboard", icon: "▦" },
  { to: "/app/reports",  label: "Reportes",  icon: "↗" },
  { to: "/app/settings", label: "Ajustes",   icon: "⚙" },
];

export const Sidebar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "TU";

  return (
    <aside
      style={{ background: "var(--bg-sidebar)", borderRight: "0.5px solid var(--border-nav)" }}
      className="w-52 shrink-0 h-screen flex flex-col"
    >
      <div style={{ borderBottom: "0.5px solid var(--border-nav)" }} className="px-5 py-4">
        <svg width="120" height="28" viewBox="0 0 120 28">
          <defs>
            <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1D9E75"/>
              <stop offset="100%" stopColor="#4a6fff"/>
            </linearGradient>
          </defs>
          <rect x="0" y="2" width="24" height="24" rx="6" fill="#0d1a2e"/>
          <polyline points="4,20 9,14 15,16 21,6" fill="none" stroke="url(#logo-g)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="21" cy="6" r="2" fill="#4a6fff"/>
          <text x="30" y="13" fontFamily="system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#e8eeff" dominantBaseline="middle">Vantage</text>
          <text x="30" y="23" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="400" fill="#3a4a7a" dominantBaseline="middle">analytics</text>
        </svg>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            style={({ isActive }) =>
              isActive
                ? { background: "rgba(99,130,255,0.15)", color: "#a0b4ff", border: "0.5px solid rgba(99,130,255,0.2)" }
                : { color: "var(--text-muted)" }
            }
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors hover:text-blue-300"
          >
            <span className="text-sm leading-none">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ borderTop: "0.5px solid var(--border-nav)" }} className="px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="avatar" className="w-7 h-7 rounded-full object-cover shrink-0" />
          ) : (
            <div style={{ background: "rgba(99,130,255,0.2)", color: "#a0b4ff" }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <p style={{ color: "var(--text-secondary)" }} className="text-xs font-medium truncate">
              {user?.firstName ?? "Tu cuenta"}
            </p>
            <p style={{ color: "var(--text-muted)" }} className="text-xs truncate">
              {user?.primaryEmailAddress?.emailAddress ?? "Plan gratuito"}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          style={{
            width: "100%", fontSize: 11,
            padding: "6px 0", borderRadius: 6,
            background: "rgba(248,113,113,0.1)",
            color: "#f87171",
            border: "0.5px solid rgba(248,113,113,0.2)",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};