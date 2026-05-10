export function formatMagnitude(mag: number): string {
  return `M ${mag.toFixed(1)}`
}

export function formatDepth(depth: number): string {
  return `${Math.round(depth)} km`
}

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60)   return 'hace un momento'
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`
  return `hace ${Math.floor(seconds / 86400)}d`
}

export function getMagColor(magnitude: number): string {
  if (magnitude >= 5.5) return '#f87171'
  if (magnitude >= 4.0) return '#fbbf24'
  return '#34d399'
}