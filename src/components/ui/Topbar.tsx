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
      height: 'var(--topbar-height)',
      background: 'var(--bg-surface)',
      borderBottom: `0.5px solid var(--border-soft)`,
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
            background: 'var(--status-error)',
            animation: 'pulse 2s infinite',
            }} />
            <span style={{
            fontSize: 'var(--text-md)',
            fontWeight: 'var(--weight-medium)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--tracking-wide)',
            }}>
            SEISMIC MONITOR
            </span>
            <span style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-muted)',
            }}>
            Global Earthquake Activity
            </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Badge variant="live">● LIVE</Badge>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            {earthquakes.length.toLocaleString()} events
            </span>
            <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            }}>
            ↻ {countdown}s
            </span>
        </div>
    </div>
  )
}