interface Props {
  children: React.ReactNode
  variant?: 'depth' | 'live' | 'default'
}

export function Badge({ children, variant = 'default' }: Props) {
  const styles: Record<string, React.CSSProperties> = {
    depth:   { background: 'rgba(34,211,238,0.1)',  color: '#67e8f9', border: '0.5px solid rgba(34,211,238,0.2)' },
    live:    { background: 'rgba(239,68,68,0.15)',  color: '#f87171', border: '0.5px solid rgba(239,68,68,0.3)' },
    default: { background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '0.5px solid rgba(255,255,255,0.1)' },
  }

  return (
    <span style={{
      ...styles[variant],
      fontSize: 10,
      padding: '2px 6px',
      borderRadius: 4,
      fontWeight: 500,
    }}>
      {children}
    </span>
  )
}