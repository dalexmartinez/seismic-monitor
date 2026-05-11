import { FilterPanel } from './FilterPanel'
import { EarthquakeList } from './EarthquakeList'
import { MagnitudeChart } from '@/components/charts/MagnitudeChart'
import type { Earthquake } from '@/types/earthquake'

interface Props {
  earthquakes: Earthquake[]
}

export function Sidebar({ earthquakes }: Props) {
  return (
    <div style={{
      width: 'var(--sidebar-width)',
      background: 'var(--bg-surface)',
      borderLeft: '0.5px solid var(--border-soft)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0,
    }}>
      <FilterPanel />
      <MagnitudeChart earthquakes={earthquakes} />
      <EarthquakeList earthquakes={earthquakes} />
    </div>
  )
}