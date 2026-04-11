import { useQuery } from "@tanstack/react-query";
import type { Platform, DateRange } from "@/types";
import { apiClient } from "@/lib/api-client";

export function useMetrics(platform: Platform, range: DateRange) {
  return useQuery({
    queryKey: ["metrics", platform, range.from, range.to],
    queryFn: () => apiClient.getMetrics(platform, range),
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
}