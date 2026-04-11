export type Platform = "youtube" | "tiktok";

export interface Metric {
  platform: Platform;
  date: string;
  views: number;
  followers: number;
  likes: number;
  engagement: number;
}

export interface DashboardSummary {
  platform: Platform;
  totalViews: number;
  totalFollowers: number;
  avgEngagement: number;
  trend: "up" | "down" | "neutral";
  trendPercent: number;
}

export interface DateRange {
  from: Date;
  to: Date;
}