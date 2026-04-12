import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockMetrics } from "@/lib/mock-data";
import { useFilters } from "@/store/filters";
import type { Metric, Platform, DashboardSummary } from "@/types";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const useMetricsDirect = (platform: Platform, days: number) =>
  useQuery({
    queryKey: ["metrics", platform, days],
    queryFn: async (): Promise<Metric[]> => {
      await new Promise((r) => setTimeout(r, 300));
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      cutoff.setHours(0, 0, 0, 0);
      return mockMetrics.filter(
        (m) => m.platform === platform && new Date(m.date) >= cutoff
      );
    },
    staleTime: 1000 * 60 * 5,
  });

const buildSummary = (platform: Platform, data: Metric[] | undefined): DashboardSummary => {
  if (!data || data.length === 0)
    return { platform, totalViews: 0, totalFollowers: 0, avgEngagement: 0, trend: "neutral", trendPercent: 0 };
  const totalViews     = data.reduce((s, m) => s + m.views, 0);
  const totalFollowers = data[data.length - 1].followers;
  const avgEngagement  = data.reduce((s, m) => s + m.engagement, 0) / data.length;
  const half           = Math.floor(data.length / 2);
  const firstHalf      = data.slice(0, half).reduce((s, m) => s + m.views, 0);
  const secondHalf     = data.slice(half).reduce((s, m) => s + m.views, 0);
  const trendPercent   = firstHalf > 0 ? ((secondHalf - firstHalf) / firstHalf) * 100 : 0;
  return {
    platform, totalViews, totalFollowers, avgEngagement,
    trend: trendPercent >= 0 ? "up" : "down",
    trendPercent: Math.abs(trendPercent),
  };
};

const card = {
  background: "rgba(255,255,255,0.04)",
  border: "0.5px solid rgba(99,130,255,0.2)",
  borderRadius: "10px",
  padding: "14px",
};

const tooltipStyle = {
  contentStyle: { background: "#0d1425", border: "0.5px solid rgba(99,130,255,0.3)", borderRadius: "8px" },
  labelStyle:   { color: "#a0b4ff", fontSize: 11 },
  itemStyle:    { fontSize: 11 },
};

export const DashboardPage = () => {
  const { days } = useFilters();
  const youtube  = useMetricsDirect("youtube", days);
  const tiktok   = useMetricsDirect("tiktok",  days);

  const chartData = useMemo(() => {
    if (!youtube.data || !tiktok.data) return [];
    return youtube.data.map((m, i) => ({
      date:    m.date.slice(5),
      YouTube: m.views,
      TikTok:  tiktok.data![i]?.views ?? 0,
    }));
  }, [youtube.data, tiktok.data]);

  const barData = useMemo(() => {
    if (!youtube.data || !tiktok.data) return [];
    return youtube.data.slice(-12).map((m, i) => ({
      date:    m.date.slice(5),
      YouTube: m.likes,
      TikTok:  tiktok.data![i]?.likes ?? 0,
    }));
  }, [youtube.data, tiktok.data]);

  const yt = buildSummary("youtube", youtube.data);
  const tt = buildSummary("tiktok",  tiktok.data);

  const totalViews     = yt.totalViews + tt.totalViews;
  const totalFollowers = yt.totalFollowers + tt.totalFollowers;
  const avgEngagement  = ((yt.avgEngagement + tt.avgEngagement) / 2);
  const totalLikes     = [
    ...(youtube.data ?? []),
    ...(tiktok.data  ?? []),
  ].reduce((s, m) => s + m.likes, 0);

  if (youtube.isLoading || tiktok.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: "var(--text-muted)" }} className="text-sm">
          Cargando métricas...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Vistas totales",  value: `${(totalViews / 1000).toFixed(1)}K`,     trend: "+8.2%",  up: true  },
          { label: "Seguidores",      value: `${(totalFollowers / 1000).toFixed(1)}K`, trend: "+3.1%",  up: true  },
          { label: "Engagement",      value: `${avgEngagement.toFixed(2)}%`,            trend: "-0.4%",  up: false },
          { label: "Likes totales",   value: `${(totalLikes / 1000).toFixed(1)}K`,     trend: "+12.7%", up: true  },
        ].map(({ label, value, trend, up }) => (
          <div key={label} style={card}>
            <p style={{ color: "var(--text-muted)", fontSize: 11, marginBottom: 4 }}>{label}</p>
            <p style={{ color: "var(--text-primary)", fontSize: 22, fontWeight: 600 }}>{value}</p>
            <p style={{ color: up ? "#4ade80" : "#f87171", fontSize: 11, marginTop: 3 }}>
              {up ? "↑" : "↓"} {trend}
            </p>
          </div>
        ))}
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div style={{ ...card, gridColumn: "span 2" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: 12, fontWeight: 500, marginBottom: 12 }}>
            Vistas por día
            <span style={{ color: "var(--text-muted)", fontWeight: 400, marginLeft: 6 }}>
              últimos {days} días
            </span>
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,130,255,0.1)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#4a5a8a" }} stroke="transparent" />
              <YAxis tick={{ fontSize: 10, fill: "#4a5a8a" }} stroke="transparent" />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#4a5a8a" }} />
              <Line type="monotone" dataKey="YouTube" stroke="#6382ff" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="TikTok"  stroke="#4ade80" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={card}>
          <p style={{ color: "var(--text-secondary)", fontSize: 12, fontWeight: 500, marginBottom: 12 }}>
            Likes por día
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,130,255,0.1)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#4a5a8a" }} stroke="transparent" />
              <YAxis tick={{ fontSize: 10, fill: "#4a5a8a" }} stroke="transparent" />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#4a5a8a" }} />
              <Bar dataKey="YouTube" fill="#6382ff" opacity={0.85} radius={[3, 3, 0, 0]} />
              <Bar dataKey="TikTok"  fill="#4ade80" opacity={0.85} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { summary: yt, badge: "YouTube", badgeBg: "rgba(248,113,113,0.15)", badgeColor: "#f87171", badgeBorder: "rgba(248,113,113,0.3)" },
          { summary: tt, badge: "TikTok",  badgeBg: "rgba(74,222,128,0.15)",  badgeColor: "#4ade80", badgeBorder: "rgba(74,222,128,0.3)"  },
        ].map(({ summary, badge, badgeBg, badgeColor, badgeBorder }) => (
          <div key={badge} style={card}>
            <span style={{ background: badgeBg, color: badgeColor, border: `0.5px solid ${badgeBorder}`, fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 20, display: "inline-block", marginBottom: 10 }}>
              {badge}
            </span>
            <div className="space-y-2">
              {[
                { label: "Vistas totales",  value: `${(summary.totalViews / 1000).toFixed(1)}K`   },
                { label: "Seguidores",      value: `${(summary.totalFollowers / 1000).toFixed(1)}K` },
                { label: "Engagement",      value: `${summary.avgEngagement.toFixed(2)}%`           },
                { label: "Tendencia",       value: `${summary.trend === "up" ? "↑" : "↓"} ${summary.trendPercent.toFixed(1)}%`, isUp: summary.trend === "up" },
              ].map(({ label, value, isUp }) => (
                <div key={label} className="flex justify-between">
                  <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{label}</span>
                  <span style={{ color: isUp !== undefined ? (isUp ? "#4ade80" : "#f87171") : "var(--text-secondary)", fontSize: 12, fontWeight: 500 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};