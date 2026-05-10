import type { Earthquake } from '@/types/earthquake'
import { Badge } from '@/components/ui/Badge'
import { formatMagnitude, formatDepth, formatTimeAgo, getMagColor } from '@/utils/formatters'

interface Props {
  earthquake: Earthquake
  isSelected: boolean
  onClick: (earthquake: Earthquake) => void
}

export function EarthquakeCard({ earthquake, isSelected, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(earthquake)}
      style={{
        padding: '9px 14px',
        borderBottom: '0.5px solid rgba(255,255,255,0.04)',
        borderLeft: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
        background: isSelected ? 'rgba(59,130,246,0.08)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: getMagColor(earthquake.magnitude) }}>
          {formatMagnitude(earthquake.magnitude)}
        </span>
        <span style={{ fontSize: 10, color: '#475569' }}>
          {formatTimeAgo(earthquake.time)}
        </span>
      </div>
      <div style={{ fontSize: 11, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {earthquake.place}
      </div>
      <div style={{ marginTop: 3 }}>
        <Badge variant="depth">{formatDepth(earthquake.depth)}</Badge>
      </div>
    </div>
  )
}