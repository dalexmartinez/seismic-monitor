import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { Earthquake } from '@/types/earthquake'

interface Props {
  earthquakes: Earthquake[]
}

function buildHourlyData(earthquakes: Earthquake[]) {
  const now = Date.now()
  const hours = Array.from({ length: 12 }, (_, i) => {
    const label = `${11 - i}h`
    const from = now - (12 - i) * 3600_000
    const to   = now - (11 - i) * 3600_000
    const count = earthquakes.filter(eq => {
      const t = eq.time.getTime()
      return t >= from && t < to
    }).length
    return { label, count }
  })
  return hours
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '0.5px solid var(--chart-border)',
      borderRadius: 'var(--radius-md)',
      padding: '4px 8px',
      fontSize: 'var(--text-base)',
      color: 'var(--text-secondary)',
    }}>
      <span style={{ color: 'var(--accent-blue-text)' }}>{payload[0].value}</span> earthquakes · {label}
    </div>
  )
}

export function MagnitudeChart({ earthquakes }: Props) {
  const data = buildHourlyData(earthquakes)

  return (
    <div style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--border-soft)' }}>
      <div style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)',
        letterSpacing: 'var(--tracking-wider)',
        marginBottom: 8,
      }}>
        EARTHQUAKES PER HOUR · LAST 12H
      </div>
      <ResponsiveContainer width="100%" height={48}>
        <BarChart data={data} barSize={8}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 9, fill: 'var(--text-subtle)' }}
            axisLine={false}
            tickLine={false}
            interval={2}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--chart-cursor-fill)' }} />
          <Bar dataKey="count" fill="var(--chart-bar-fill)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}