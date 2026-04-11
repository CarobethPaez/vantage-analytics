import { create } from "zustand";
import type { Platform } from "@/types";

interface FiltersState {
  platforms: Platform[];
  dateRange: { from: Date; to: Date };
  setPlatforms: (platforms: Platform[]) => void;
  setDateRange: (range: { from: Date; to: Date }) => void;
}

const today = new Date();
today.setHours(23, 59, 59, 999);

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
thirtyDaysAgo.setHours(0, 0, 0, 0);

export const useFilters = create<FiltersState>((set) => ({
  platforms: ["youtube", "tiktok"],
  dateRange: {
    from: thirtyDaysAgo,
    to: today,
  },
  setPlatforms: (platforms) => set({ platforms }),
  setDateRange: (dateRange) => set({ dateRange }),
}));