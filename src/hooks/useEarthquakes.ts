import { useQuery } from '@tanstack/react-query'
import { fetchEarthquakes } from '@/api/usgs'
import { useFilterStore } from '@/store/filterStore'

export function useEarthquakes() {
  const { timeRange, magnitude } = useFilterStore()

  return useQuery({
    queryKey: ['earthquakes', magnitude, timeRange],
    queryFn:  () => fetchEarthquakes(magnitude, timeRange),
    refetchInterval: 60_000,   // polling cada 60s
    staleTime:       30_000,
  })
}