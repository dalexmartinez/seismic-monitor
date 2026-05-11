export function MapLegend() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 16,
      left: 16,
      background: 'var(--overlay-dark)',
      border: '0.5px solid var(--border-soft)',
      borderRadius: 'var(--radius-lg)',
      padding: '10px 12px',
      zIndex: 10,
      backdropFilter: 'blur(4px)',
    }}>

      {/* Magnitude */}
      <div style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)',
        letterSpacing: 'var(--tracking-wider)',
        marginBottom: 8,
      }}>
        MAGNITUDE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
        {[
          { label: 'M 2.5 – 4.0', size: 5 },
          { label: 'M 4.0 – 5.5', size: 9 },
          { label: 'M 5.5+',      size: 13 },
        ].map(({ label, size }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: size, height: size,
              borderRadius: '50%',
              background: 'var(--legend-dot-color)',
              flexShrink: 0,
              marginLeft: (13 - size) / 2,
            }} />
            <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Depth */}
      <div style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)',
        letterSpacing: 'var(--tracking-wider)',
        marginBottom: 6,
      }}>
        DEPTH
      </div>
      <div style={{
        width: 120, height: 6,
        borderRadius: 3,
        background: 'var(--depth-gradient)',
        marginBottom: 4,
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>0 km</span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>300 km</span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>700+ km</span>
      </div>

    </div>
  )
}