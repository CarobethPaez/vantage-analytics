import { create } from "zustand";
import type { Platform } from "@/types";

interface FiltersState {
  to: any;
  from: any;
  platforms: Platform[];
  days: number;
  setDays: (days: number) => void;
  setPlatforms: (platforms: Platform[]) => void;
}

export const useFilters = create<FiltersState>((set) => ({
  to: null,
  from: null,
  platforms: ["youtube", "tiktok"],
  days: 30,
  setDays: (days) => set({ days }),
  setPlatforms: (platforms) => set({ platforms }),
}));