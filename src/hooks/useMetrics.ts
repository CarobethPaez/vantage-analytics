import { useQuery } from "@tanstack/react-query";
import { useFilters } from "@/store/filters";
import { apiClient } from "@/lib/api-client";
import type { Platform } from "@/types";

export function useMetrics(platform: Platform) {
  const { dateRange } = useFilters();

  return useQuery({
    queryKey: ["metrics", platform, dateRange.from, dateRange.to],
    queryFn: () => apiClient.getMetrics(platform, dateRange),
    staleTime: 1000 * 60 * 5,
  });
}