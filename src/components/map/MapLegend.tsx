export function MapLegend() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 16,
      left: 16,
      background: 'rgba(13,20,34,0.85)',
      border: '0.5px solid rgba(255,255,255,0.08)',
      borderRadius: 8,
      padding: '10px 12px',
      zIndex: 10,
      backdropFilter: 'blur(4px)',
    }}>

      {/* Magnitud */}
      <div style={{ fontSize: 10, color: '#64748b', letterSpacing: '0.08em', marginBottom: 8 }}>
        MAGNITUD
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
              background: '#94a3b8',
              flexShrink: 0,
              marginLeft: (13 - size) / 2,
            }} />
            <span style={{ fontSize: 11, color: '#94a3b8' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Profundidad */}
      <div style={{ fontSize: 10, color: '#64748b', letterSpacing: '0.08em', marginBottom: 6 }}>
        PROFUNDIDAD
      </div>
      <div style={{
        width: 120, height: 6,
        borderRadius: 3,
        background: 'linear-gradient(to right, #22d3ee, #fbbf24, #ef4444)',
        marginBottom: 4,
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9, color: '#64748b' }}>0 km</span>
        <span style={{ fontSize: 9, color: '#64748b' }}>300 km</span>
        <span style={{ fontSize: 9, color: '#64748b' }}>700+ km</span>
      </div>

    </div>
  )
}