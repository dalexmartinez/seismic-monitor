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
      background: '#0d1422',
      border: '0.5px solid rgba(255,255,255,0.12)',
      borderRadius: 6,
      padding: '4px 8px',
      fontSize: 11,
      color: '#94a3b8',
    }}>
      <span style={{ color: '#93c5fd' }}>{payload[0].value}</span> sismos · {label}
    </div>
  )
}

export function MagnitudeChart({ earthquakes }: Props) {
  const data = buildHourlyData(earthquakes)

  return (
    <div style={{ padding: '10px 14px', borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
      <div style={{ fontSize: 10, color: '#64748b', letterSpacing: '0.06em', marginBottom: 8 }}>
        SISMOS POR HORA · ÚLTIMAS 12H
      </div>
      <ResponsiveContainer width="100%" height={48}>
        <BarChart data={data} barSize={8}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 9, fill: '#475569' }}
            axisLine={false}
            tickLine={false}
            interval={2}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="count" fill="rgba(59,130,246,0.5)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}