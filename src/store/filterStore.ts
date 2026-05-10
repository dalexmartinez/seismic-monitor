
import { create } from 'zustand'
import type { TimeRange, MagnitudeFilter } from '@/types/earthquake'

interface FlyTarget {
  longitude: number
  latitude: number
}

interface FilterState {
  timeRange: TimeRange
  magnitude: MagnitudeFilter
  selectedId: string | null
  flyTarget: FlyTarget | null
  setTimeRange: (r: TimeRange) => void
  setMagnitude: (m: MagnitudeFilter) => void
  setSelectedId: (id: string | null) => void
  setFlyTarget: (target: FlyTarget | null) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  timeRange:  '1day',
  magnitude:  '2.5+',
  selectedId: null,
  flyTarget:  null,
  setTimeRange:  (timeRange)  => set({ timeRange }),
  setMagnitude:  (magnitude)  => set({ magnitude }),
  setSelectedId: (selectedId) => set({ selectedId }),
  setFlyTarget:  (flyTarget)  => set({ flyTarget }),
}))