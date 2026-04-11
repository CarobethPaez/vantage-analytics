import { create } from "zustand";
import type { Platform } from "@/types";

interface FiltersState {
  platforms: Platform[];
  dateRange: { from: Date; to: Date };
  setPlatforms: (platforms: Platform[]) => void;
  setDateRange: (range: { from: Date; to: Date }) => void;
}

const defaultRange = {
  from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  to: new Date(),
};

export const useFilters = create<FiltersState>((set) => ({
  platforms: ["youtube", "tiktok"],
  dateRange: defaultRange,
  setPlatforms: (platforms) => set({ platforms }),
  setDateRange: (dateRange) => set({ dateRange }),
}));