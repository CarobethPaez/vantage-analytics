import type { Metric, DateRange, Platform } from "@/types";
import { mockMetrics } from "./mock-data";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const apiClient = {
  async getMetrics(
    platform: Platform,
    range: DateRange
  ): Promise<Metric[]> {
    if (USE_MOCK) {
      await delay(400); // simula latencia real
      return mockMetrics.filter(
        (m) =>
          m.platform === platform &&
          new Date(m.date) >= range.from &&
          new Date(m.date) <= range.to
      );
    }
    // Aquí irá el fetch real cuando tengas la API
    const res = await fetch(
      `/api/metrics?platform=${platform}&from=${range.from.toISOString()}&to=${range.to.toISOString()}`
    );
    return res.json();
  },
};