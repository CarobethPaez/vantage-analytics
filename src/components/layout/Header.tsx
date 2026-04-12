import { useFilters } from "@/store/filters";

const ranges = [
  { label: "Últimos 7 días",  days: 7  },
  { label: "Últimos 30 días", days: 30 },
  { label: "Últimos 90 días", days: 90 },
];

interface Props {
  title: string;
  description?: string;
}

export const Header = ({ title, description }: Props) => {
  const { days, setDays } = useFilters();

  return (
    <header
      style={{
        background: "rgba(255,255,255,0.02)",
        borderBottom: "0.5px solid var(--border-nav)",
      }}
      className="h-14 flex items-center px-6 gap-4 shrink-0"
    >
      <div className="flex-1 min-w-0">
        <h1 style={{ color: "var(--text-primary)" }} className="text-sm font-semibold truncate">
          {title}
        </h1>
        {description && (
          <p style={{ color: "var(--text-muted)" }} className="text-xs truncate">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          style={{
            background: "rgba(99,130,255,0.1)",
            border: "0.5px solid rgba(99,130,255,0.3)",
            color: "#a0b4ff",
          }}
          className="text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
        >
          {ranges.map((r) => (
            <option key={r.days} value={r.days} style={{ background: "#0d1425" }}>
              {r.label}
            </option>
          ))}
        </select>

        <button
          style={{
            background: "linear-gradient(135deg, #4a6fff, #6a3fff)",
            border: "none",
          }}
          className="text-xs text-white px-3 py-1.5 rounded-lg transition-opacity hover:opacity-90"
        >
          Exportar PDF
        </button>
      </div>
    </header>
  );
};