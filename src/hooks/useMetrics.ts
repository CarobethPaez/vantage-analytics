import { useQuery } from "@tanstack/react-query";
import { useFilters } from "@/store/filters";
import { apiClient } from "@/lib/api-client";
import type { Platform } from "@/types";

export function useMetrics(platform: Platform) {
  const { dateRange } = useFilters();

  const fromStr = dateRange.from.toISOString().split("T")[0];
  const toStr   = dateRange.to.toISOString().split("T")[0];

  console.log("queryKey:", ["metrics", platform, fromStr, toStr]);
  console.log("apiClient:", apiClient);

  return useQuery({
    queryKey: ["metrics", platform, fromStr, toStr],
    queryFn: async () => {
      console.log("queryFn ejecutándose para:", platform);
      const result = await apiClient.getMetrics(platform, dateRange);
      console.log("resultado:", result?.length, "items");
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });
}