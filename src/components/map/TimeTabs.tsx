import { useFilterStore } from '@/store/filterStore'
import type { TimeRange } from '@/types/earthquake'

const options: { label: string; value: TimeRange }[] = [
  { label: '24h',    value: '1day' },
  { label: '7 días', value: '7days' },
  { label: '30 días', value: '30days' },
]

export function TimeTabs() {
  const { timeRange, setTimeRange } = useFilterStore()

  return (
    <div style={{
      position: 'absolute',
      top: 12,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      background: 'rgba(13,20,34,0.85)',
      border: '0.5px solid rgba(255,255,255,0.08)',
      borderRadius: 6,
      padding: 2,
      gap: 2,
      zIndex: 10,
      backdropFilter: 'blur(4px)',
    }}>
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => setTimeRange(o.value)}
          style={{
            fontSize: 11,
            padding: '4px 12px',
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s',
            background: timeRange === o.value ? 'rgba(59,130,246,0.2)' : 'transparent',
            color: timeRange === o.value ? '#93c5fd' : '#64748b',
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}