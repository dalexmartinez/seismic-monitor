import { useEarthquakes } from '@/hooks/useEarthquakes'

export function Statusbar() {
  const { isFetching, isError, dataUpdatedAt } = useEarthquakes()

  const lastUpdate = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '--:--:--'

  return (
    <div style={{
      height: 'var(--statusbar-height)',
      background: 'var(--bg-deep)',
      borderTop: '0.5px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 14px',
      gap: 20,
      flexShrink: 0,
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: isError ? 'var(--status-error)' : isFetching ? 'var(--status-warning)' : 'var(--status-ok)',
          transition: 'background 0.3s',
        }} />
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-subtle)' }}>
          {isError ? 'Connection error' : isFetching ? 'Updating...' : 'API connected'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-subtle)' }}>
          Last update: {lastUpdate}
        </span>
      </div>

      <div style={{ marginLeft: 'auto', fontSize: 'var(--text-sm)', color: 'var(--text-subtle)' }}>
        Source: USGS Earthquake Hazards Program
      </div>
    </div>
  )
}