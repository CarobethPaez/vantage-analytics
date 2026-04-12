import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockMetrics } from "@/lib/mock-data";
import { useFilters } from "@/store/filters";
import type { Metric, Platform } from "@/types";

const useAllMetrics = (days: number) =>
  useQuery({
    queryKey: ["all-metrics", days],
    queryFn: async (): Promise<Metric[]> => {
      await new Promise((r) => setTimeout(r, 300));
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      cutoff.setHours(0, 0, 0, 0);
      return mockMetrics.filter((m) => new Date(m.date) >= cutoff);
    },
    staleTime: 1000 * 60 * 5,
  });

const card = {
  background: "rgba(255,255,255,0.04)",
  border: "0.5px solid rgba(99,130,255,0.2)",
  borderRadius: "10px",
};

const platformConfig: Record<Platform, { color: string; bg: string; border: string }> = {
  youtube: { color: "#f87171", bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.3)" },
  tiktok:  { color: "#4ade80", bg: "rgba(74,222,128,0.15)",  border: "rgba(74,222,128,0.3)"  },
};

type SortKey = "date" | "views" | "followers" | "likes" | "engagement";
type SortDir = "asc" | "desc";

export const ReportsPage = () => {
  const { days } = useFilters();
  const { data, isLoading } = useAllMetrics(days);

  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [sortKey,  setSortKey]  = useState<SortKey>("date");
  const [sortDir,  setSortDir]  = useState<SortDir>("desc");
  const [page,     setPage]     = useState(1);
  const perPage = 10;

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
    setPage(1);
  };

  const filtered = useMemo(() => {
    if (!data) return [];
    return data
      .filter((m) => platformFilter === "all" || m.platform === platformFilter)
      .sort((a, b) => {
        const mul = sortDir === "asc" ? 1 : -1;
        if (sortKey === "date") return mul * a.date.localeCompare(b.date);
        return mul * (a[sortKey] - b[sortKey]);
      });
  }, [data, platformFilter, sortKey, sortDir]);

  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? <span style={{ color: "#a0b4ff", marginLeft: 4 }}>{sortDir === "asc" ? "↑" : "↓"}</span>
      : <span style={{ color: "rgba(99,130,255,0.3)", marginLeft: 4 }}>↕</span>;

  const thStyle = (): React.CSSProperties => ({
    padding: "10px 14px",
    fontSize: 11,
    color: "var(--text-muted)",
    fontWeight: 500,
    textAlign: "left",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    borderBottom: "0.5px solid rgba(99,130,255,0.15)",
  });

  const tdStyle: React.CSSProperties = {
    padding: "10px 14px",
    fontSize: 12,
    color: "var(--text-secondary)",
    borderBottom: "0.5px solid rgba(99,130,255,0.08)",
    whiteSpace: "nowrap",
  };

  return (
    <div className="space-y-4">

      {/* Filtros */}
      <div className="flex items-center gap-3 flex-wrap">
        {(["all", "youtube", "tiktok"] as const).map((p) => (
          <button
            key={p}
            onClick={() => { setPlatformFilter(p); setPage(1); }}
            style={{
              fontSize: 12,
              padding: "5px 14px",
              borderRadius: 20,
              cursor: "pointer",
              border: "0.5px solid",
              transition: "all 0.15s",
              ...(platformFilter === p
                ? { background: "rgba(99,130,255,0.2)", color: "#a0b4ff", borderColor: "rgba(99,130,255,0.4)" }
                : { background: "transparent",          color: "var(--text-muted)", borderColor: "rgba(99,130,255,0.15)" }
              ),
            }}
          >
            {p === "all" ? "Todas las plataformas" : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
        <span style={{ color: "var(--text-muted)", fontSize: 12, marginLeft: "auto" }}>
          {filtered.length} registros
        </span>
      </div>

      {/* Tabla */}
      <div style={card}>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Cargando datos...</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle()}     onClick={() => handleSort("date")}>
                    Fecha <SortIcon k="date" />
                  </th>
                  <th style={{ ...thStyle(), cursor: "default" }}>Plataforma</th>
                  <th style={thStyle()}      onClick={() => handleSort("views")}>
                    Vistas <SortIcon k="views" />
                  </th>
                  <th style={thStyle()}  onClick={() => handleSort("followers")}>
                    Seguidores <SortIcon k="followers" />
                  </th>
                  <th style={thStyle()}      onClick={() => handleSort("likes")}>
                    Likes <SortIcon k="likes" />
                  </th>
                  <th style={thStyle()} onClick={() => handleSort("engagement")}>
                    Engagement <SortIcon k="engagement" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((m, i) => {
                  const cfg = platformConfig[m.platform];
                  return (
                    <tr
                      key={`${m.platform}-${m.date}-${i}`}
                      style={{ transition: "background 0.1s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,130,255,0.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={tdStyle}>{m.date}</td>
                      <td style={tdStyle}>
                        <span style={{
                          background: cfg.bg,
                          color: cfg.color,
                          border: `0.5px solid ${cfg.border}`,
                          fontSize: 10,
                          padding: "2px 8px",
                          borderRadius: 20,
                        }}>
                          {m.platform.charAt(0).toUpperCase() + m.platform.slice(1)}
                        </span>
                      </td>
                      <td style={tdStyle}>{m.views.toLocaleString()}</td>
                      <td style={tdStyle}>{m.followers.toLocaleString()}</td>
                      <td style={tdStyle}>{m.likes.toLocaleString()}</td>
                      <td style={{ ...tdStyle, color: m.engagement >= 5 ? "#4ade80" : "var(--text-secondary)" }}>
                        {m.engagement.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
            Página {page} de {totalPages}
          </span>
                    <div className="flex gap-2">
                      {[
                        { label: "Anterior", disabled: page === 1, onClick: () => setPage(page - 1) },
                        { label: "Siguiente", disabled: page === totalPages, onClick: () => setPage(page + 1) },
                      ].map((btn) => (
                        <button
                          key={btn.label}
                          onClick={btn.onClick}
                          disabled={btn.disabled}
                          style={{
                            fontSize: 12,
                            padding: "6px 14px",
                            borderRadius: 6,
                            border: "0.5px solid rgba(99,130,255,0.2)",
                            background: btn.disabled ? "rgba(99,130,255,0.05)" : "transparent",
                            color: btn.disabled ? "var(--text-muted)" : "var(--text-secondary)",
                            cursor: btn.disabled ? "not-allowed" : "pointer",
                            transition: "all 0.15s",
                          }}
                        >
                          {btn.label}
                        </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        };