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
      <div style={{
        width: 120, height: 6,
        borderRadius: 3,
        background: 'linear-gradient(to right, #a3e635, #fbbf24, #ef4444)',
        marginBottom: 4,
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>M 2.5</span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>M 5.5</span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>M 9.0</span>
      </div>

      {/* Depth */}
      <div style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)',
        letterSpacing: 'var(--tracking-wider)',
        marginBottom: 8,
      }}>
        DEPTH
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {[
          { label: '0 – 70 km',   size: 16 },
          { label: '70 – 300 km', size: 10 },
          { label: '300+ km',     size: 6  },
        ].map(({ label, size }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: size, height: size,
              borderRadius: '50%',
              background: 'var(--legend-dot-color)',
              flexShrink: 0,
              marginLeft: (16 - size) / 2,
            }} />
            <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>{label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}