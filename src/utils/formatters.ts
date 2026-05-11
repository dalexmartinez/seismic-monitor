const MAG_HIGH = '#f87171' // --mag-high
const MAG_MID  = '#fbbf24' // --mag-mid
const MAG_LOW  = '#34d399' // --mag-low

export function formatMagnitude(mag: number): string {
  return `M ${mag.toFixed(1)}`
}

export function formatDepth(depth: number): string {
  return `${Math.round(depth)} km`
}

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60)    return 'a moment ago'
  if (seconds < 3600)  return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

export function getMagColor(magnitude: number): string {
  if (magnitude >= 5.5) return MAG_HIGH
  if (magnitude >= 4.0) return MAG_MID
  return MAG_LOW
}