import { useMemo } from "react";
import { useMetrics } from "@/features/analytics/hooks/useMetrics";
import { MetricCard } from "@/features/analytics/components/MetricCard";
import type { DashboardSummary, Platform } from "@/types";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const range = {
  from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  to: new Date(),
};

const buildSummary = (
  platform: Platform,
  data: { views: number; followers: number; engagement: number }[] | undefined
): DashboardSummary => {
  if (!data || data.length === 0) {
    return { platform, totalViews: 0, totalFollowers: 0, avgEngagement: 0, trend: "neutral", trendPercent: 0 };
  }
  const totalViews = data.reduce((s, m) => s + m.views, 0);
  const totalFollowers = data[data.length - 1].followers;
  const avgEngagement = data.reduce((s, m) => s + m.engagement, 0) / data.length;
  const half = Math.floor(data.length / 2);
  const firstHalf = data.slice(0, half).reduce((s, m) => s + m.views, 0);
  const secondHalf = data.slice(half).reduce((s, m) => s + m.views, 0);
  const trendPercent = firstHalf > 0 ? ((secondHalf - firstHalf) / firstHalf) * 100 : 0;

  return {
    platform,
    totalViews,
    totalFollowers,
    avgEngagement,
    trend: trendPercent >= 0 ? "up" : "down",
    trendPercent: Math.abs(trendPercent),
  };
};

export const DashboardPage = () => {
  const youtube = useMetrics("youtube", range);
  const tiktok  = useMetrics("tiktok",  range);

  const chartData = useMemo(() => {
    if (!youtube.data || !tiktok.data) return [];
    return youtube.data.map((m, i) => ({
      date: m.date.slice(5),
      YouTube: m.views,
      TikTok: tiktok.data![i]?.views ?? 0,
    }));
  }, [youtube.data, tiktok.data]);

  const ytSummary = buildSummary("youtube", youtube.data);
  const ttSummary = buildSummary("tiktok",  tiktok.data);
  const isLoading = youtube.isLoading || tiktok.isLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Cargando métricas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard summary={ytSummary} />
        <MetricCard summary={ttSummary} />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">
          Vistas por día
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#e5e7eb" />
            <YAxis tick={{ fontSize: 11 }} stroke="#e5e7eb" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="YouTube"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="TikTok"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};