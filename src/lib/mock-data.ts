import type { Metric } from "@/types";

const generateMetrics = (
  platform: "youtube" | "tiktok",
  days: number
): Metric[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    const base = platform === "youtube" ? 8000 : 15000;

    return {
      platform,
      date: date.toISOString().split("T")[0],
      views: Math.round(base + Math.random() * 4000 - 2000),
      followers: Math.round(120000 + i * 80 + Math.random() * 200),
      likes: Math.round(400 + Math.random() * 300),
      engagement: parseFloat((3 + Math.random() * 4).toFixed(2)),
    };
  });
};

export const mockMetrics: Metric[] = [
  ...generateMetrics("youtube", 30),
  ...generateMetrics("tiktok", 30),
];