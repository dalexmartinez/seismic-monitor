import { FilterPanel } from './FilterPanel'
import { EarthquakeList } from './EarthquakeList'
import type { Earthquake } from '@/types/earthquake'

interface Props {
  earthquakes: Earthquake[]
}

export function Sidebar({ earthquakes }: Props) {
  return (
    <div style={{
      width: 260,
      background: '#0d1422',
      borderLeft: '0.5px solid rgba(255,255,255,0.07)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0,
    }}>
      <FilterPanel />
      <EarthquakeList earthquakes={earthquakes} />
    </div>
  )
}