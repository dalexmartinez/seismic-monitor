import { useEarthquakes } from '@/hooks/useEarthquakes'

export function Statusbar() {
  const { isFetching, isError, dataUpdatedAt } = useEarthquakes()

  const lastUpdate = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--'

  return (
    <div style={{
      height: 24,
      background: '#070d18',
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
          background: isError ? '#ef4444' : isFetching ? '#fbbf24' : '#22c55e',
          transition: 'background 0.3s',
        }} />
        <span style={{ fontSize: 10, color: '#475569' }}>
          {isError ? 'Error de conexión' : isFetching ? 'Actualizando...' : 'API conectada'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 10, color: '#475569' }}>
          Última actualización: {lastUpdate}
        </span>
      </div>

      <div style={{ marginLeft: 'auto', fontSize: 10, color: '#475569' }}>
        Fuente: USGS Earthquake Hazards Program
      </div>
    </div>
  )
}