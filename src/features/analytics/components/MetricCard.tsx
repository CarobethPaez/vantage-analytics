import type { DashboardSummary } from "@/types";

const platformColors = {
  youtube: { bg: "#FEE2E2", text: "#991B1B", label: "YouTube" },
  tiktok:  { bg: "#F0FDF4", text: "#166534", label: "TikTok"  },
};

interface Props {
  summary: DashboardSummary;
}

export const MetricCard = ({ summary }: Props) => {
  const color = platformColors[summary.platform];
  const isUp = summary.trend === "up";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: color.bg, color: color.text }}
        >
          {color.label}
        </span>
        <span
          className={`text-sm font-medium ${
            isUp ? "text-green-600" : "text-red-500"
          }`}
        >
          {isUp ? "↑" : "↓"} {summary.trendPercent.toFixed(1)}%
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Vistas totales</p>
          <p className="text-2xl font-semibold text-gray-900">
            {(summary.totalViews / 1000).toFixed(1)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Seguidores</p>
          <p className="text-lg font-medium text-gray-800">
            {(summary.totalFollowers / 1000).toFixed(1)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Engagement promedio</p>
          <p className="text-lg font-medium text-gray-800">
            {summary.avgEngagement.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};