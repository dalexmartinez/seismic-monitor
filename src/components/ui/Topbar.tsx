import { useEarthquakes } from '@/hooks/useEarthquakes'
import { Badge } from '@/components/ui/Badge'
import { useEffect, useState } from 'react'

export function Topbar() {
  const { data: earthquakes = [], dataUpdatedAt } = useEarthquakes()
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    setCountdown(60)
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) return 60
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [dataUpdatedAt])

  return (
    <div style={{
      height: 44,
      background: '#0d1422',
      borderBottom: '0.5px solid rgba(255,255,255,0.07)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      flexShrink: 0,
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#ef4444',
          animation: 'pulse 2s infinite',
        }} />
        <span style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0', letterSpacing: '0.05em' }}>
          SEISMIC MONITOR
        </span>
        <span style={{ fontSize: 11, color: '#64748b' }}>
          Global Earthquake Activity
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Badge variant="live">● LIVE</Badge>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>
          {earthquakes.length.toLocaleString()} eventos
        </span>
        <span style={{ fontSize: 10, color: '#475569', display: 'flex', alignItems: 'center', gap: 4 }}>
          ↻ {countdown}s
        </span>
      </div>
    </div>
  )
}