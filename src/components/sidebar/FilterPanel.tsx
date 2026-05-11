import { useFilterStore } from '@/store/filterStore'
import type { TimeRange, MagnitudeFilter } from '@/types/earthquake'

const timeOptions: { label: string; value: TimeRange }[] = [
  { label: '24h',     value: '1day' },
  { label: '7 days',  value: '7days' },
  { label: '30 days', value: '30days' },
]

const magOptions: { label: string; value: MagnitudeFilter }[] = [
  { label: 'All',   value: 'all' },
  { label: 'M 2.5+', value: '2.5+' },
  { label: 'M 4.5+', value: '4.5+' },
  { label: 'Notable', value: 'significant' },
]

const pillStyle = (active: boolean): React.CSSProperties => ({
  fontSize: 'var(--text-sm)',
  padding: '3px 8px',
  borderRadius: 20,
  border: active ? '0.5px solid var(--border-accent)' : '0.5px solid var(--border-soft)',
  background: active ? 'var(--accent-blue-soft)' : 'transparent',
  color: active ? 'var(--accent-blue-text)' : 'var(--text-muted)',
  cursor: 'pointer',
  transition: 'all 0.15s',
})

export function FilterPanel() {
  const { timeRange, magnitude, setTimeRange, setMagnitude } = useFilterStore()

  return (
    <div style={{ padding: '12px 14px', borderBottom: '0.5px solid var(--border-soft)' }}>
      <div style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)',
        letterSpacing: 'var(--tracking-wider)',
        marginBottom: 10,
      }}>
        FILTERS
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>Period</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {timeOptions.map(o => (
              <button key={o.value} style={pillStyle(timeRange === o.value)} onClick={() => setTimeRange(o.value)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>Mag.</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {magOptions.map(o => (
              <button key={o.value} style={pillStyle(magnitude === o.value)} onClick={() => setMagnitude(o.value)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}