import { useFilterStore } from '@/store/filterStore'
import type { TimeRange, MagnitudeFilter } from '@/types/earthquake'

const timeOptions: { label: string; value: TimeRange }[] = [
  { label: '24h',   value: '1day' },
  { label: '7 días', value: '7days' },
  { label: '30 días', value: '30days' },
]

const magOptions: { label: string; value: MagnitudeFilter }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'M 2.5+', value: '2.5+' },
  { label: 'M 4.5+', value: '4.5+' },
  { label: 'Sig.', value: 'significant' },
]

const pillStyle = (active: boolean): React.CSSProperties => ({
  fontSize: 10,
  padding: '3px 8px',
  borderRadius: 20,
  border: active ? '0.5px solid rgba(59,130,246,0.4)' : '0.5px solid rgba(255,255,255,0.1)',
  background: active ? 'rgba(59,130,246,0.2)' : 'transparent',
  color: active ? '#93c5fd' : '#64748b',
  cursor: 'pointer',
  transition: 'all 0.15s',
})

export function FilterPanel() {
  const { timeRange, magnitude, setTimeRange, setMagnitude } = useFilterStore()

  return (
    <div style={{ padding: '12px 14px', borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
      <div style={{ fontSize: 10, color: '#64748b', letterSpacing: '0.08em', marginBottom: 10 }}>
        FILTROS
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>Período</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {timeOptions.map(o => (
              <button key={o.value} style={pillStyle(timeRange === o.value)} onClick={() => setTimeRange(o.value)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>Magnitud</span>
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