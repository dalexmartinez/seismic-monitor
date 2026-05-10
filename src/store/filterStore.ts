import { create } from 'zustand'
import type { TimeRange, MagnitudeFilter } from '@/types/earthquake'

interface FilterState {
  timeRange: TimeRange
  magnitude: MagnitudeFilter
  selectedId: string | null
  setTimeRange: (r: TimeRange) => void
  setMagnitude: (m: MagnitudeFilter) => void
  setSelectedId: (id: string | null) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  timeRange:  '1day',
  magnitude:  '2.5+',
  selectedId: null,
  setTimeRange:  (timeRange)  => set({ timeRange }),
  setMagnitude:  (magnitude)  => set({ magnitude }),
  setSelectedId: (selectedId) => set({ selectedId }),
}))