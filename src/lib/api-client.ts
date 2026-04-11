import type { Metric, DateRange, Platform } from "@/types";
import { mockMetrics } from "./mock-data";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiClient = {
  async getMetrics(platform: Platform, range: DateRange): Promise<Metric[]> {
    if (USE_MOCK) {
      await delay(400);

      const from = new Date(range.from);
      const to = new Date(range.to);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);

      const filtered = mockMetrics.filter((m) => {
        const date = new Date(m.date);
        return m.platform === platform && date >= from && date <= to;
      });

      // Si no hay datos para el rango, devolver los últimos N días disponibles
      if (filtered.length === 0) {
        return mockMetrics
          .filter((m) => m.platform === platform)
          .slice(-7);
      }

      return filtered;
    }

    const res = await fetch(
      `/api/metrics?platform=${platform}&from=${range.from.toISOString()}&to=${range.to.toISOString()}`
    );
    return res.json();
  },
};