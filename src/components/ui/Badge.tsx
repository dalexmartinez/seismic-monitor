interface Props {
  children: React.ReactNode
  variant?: 'depth' | 'live' | 'default'
}

export function Badge({ children, variant = 'default' }: Props) {
  const styles: Record<string, React.CSSProperties> = {
    depth: { background: 'var(--badge-depth-bg)', color: 'var(--badge-depth-color)', border: '0.5px solid var(--badge-depth-border)' },
    live:    { background: 'var(--badge-live-bg)',    color: 'var(--status-error)', border: '0.5px solid var(--badge-live-border)' },
    default: { background: 'var(--badge-default-bg)', color: 'var(--text-secondary)', border: '0.5px solid var(--border-soft)' },
  }

  return (
    <span style={{
      ...styles[variant],
      fontSize: 'var(--text-sm)',
      padding: '2px 6px',
      borderRadius: 'var(--radius-sm)',
      fontWeight: 'var(--weight-medium)',
    }}>
      {children}
    </span>
  )
}