import { useFilterStore } from '@/store/filterStore'
import type { TimeRange } from '@/types/earthquake'

const options: { label: string; value: TimeRange }[] = [
  { label: '24h',     value: '1day' },
  { label: '7 days',  value: '7days' },
  { label: '30 days', value: '30days' },
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
      background: 'var(--overlay-dark)',
      border: '0.5px solid var(--border-soft)',
      borderRadius: 'var(--radius-md)',
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
            fontSize: 'var(--text-base)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s',
            background: timeRange === o.value ? 'var(--accent-blue-soft)' : 'transparent',
            color: timeRange === o.value ? 'var(--accent-blue-text)' : 'var(--text-muted)',
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}