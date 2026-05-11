import { useFilterStore } from '@/store/filterStore'
import { EarthquakeCard } from './EarthquakeCard'
import type { Earthquake } from '@/types/earthquake'

interface Props {
  earthquakes: Earthquake[]
}

export function EarthquakeList({ earthquakes }: Props) {
  const { selectedId, setSelectedId, setFlyTarget } = useFilterStore()

  const sorted = [...earthquakes].sort((a, b) => b.magnitude - a.magnitude)

  function handleClick(eq: Earthquake) {
    setSelectedId(eq.id === selectedId ? null : eq.id)
    setFlyTarget({ longitude: eq.longitude, latitude: eq.latitude })
  }

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: 'var(--scrollbar-color) transparent',
    }}>
      <div style={{
        padding: '8px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--text-muted)',
          letterSpacing: 'var(--tracking-wider)',
        }}>
          EARTHQUAKES · {earthquakes.length}
        </span>
      </div>
      {sorted.map(eq => (
        <EarthquakeCard
          key={eq.id}
          earthquake={eq}
          isSelected={eq.id === selectedId}
          onClick={handleClick}
        />
      ))}
    </div>
  )
}