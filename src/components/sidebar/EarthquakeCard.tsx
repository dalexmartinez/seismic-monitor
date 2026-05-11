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
        borderBottom: '0.5px solid var(--border-subtle)',
        borderLeft: isSelected ? '2px solid var(--card-selected-border)' : '2px solid transparent',
        background: isSelected ? 'var(--card-selected-bg)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--weight-medium)',
            color: getMagColor(earthquake.magnitude),
          }}>
            {formatMagnitude(earthquake.magnitude)}
          </span>
          <Badge variant="depth">{formatDepth(earthquake.depth)}</Badge>
        </div>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-subtle)' }}>
          {formatTimeAgo(earthquake.time)}
        </span>
      </div>
      <div style={{
        fontSize: 'var(--text-base)',
        color: 'var(--text-secondary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {earthquake.place}
      </div>
    </div>
  )
}