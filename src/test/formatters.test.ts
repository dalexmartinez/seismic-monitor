import { describe, it, expect } from 'vitest'
import { formatMagnitude, formatDepth, formatTimeAgo, getMagColor } from '@/utils/formatters'

describe('formatMagnitude', () => {
  it('formats magnitude with one decimal', () => {
    expect(formatMagnitude(4.7)).toBe('M 4.7')
  })

  it('formats whole number magnitude', () => {
    // Should always show one decimal even for whole numbers
    expect(formatMagnitude(5)).toBe('M 5.0')
  })
})

describe('formatDepth', () => {
  it('rounds depth to nearest integer', () => {
    // USGS returns float values — UI should show clean integers
    expect(formatDepth(32.4)).toBe('32 km')
  })

  it('rounds up correctly', () => {
    expect(formatDepth(32.6)).toBe('33 km')
  })
})

describe('formatTimeAgo', () => {
  it('returns "a moment ago" for recent events', () => {
    // Events under 60 seconds old should show this message
    const now = new Date()
    expect(formatTimeAgo(now)).toBe('a moment ago')
  })

  it('returns minutes ago', () => {
    // 5 minutes ago
    const date = new Date(Date.now() - 5 * 60 * 1000)
    expect(formatTimeAgo(date)).toBe('5m ago')
  })

  it('returns hours ago', () => {
    // 3 hours ago
    const date = new Date(Date.now() - 3 * 3600 * 1000)
    expect(formatTimeAgo(date)).toBe('3h ago')
  })
})

describe('getMagColor', () => {
  it('returns red for high magnitude', () => {
    // M 5.5+ is considered high — should trigger danger color
    expect(getMagColor(6.0)).toBe('#f87171')
  })

  it('returns yellow for medium magnitude', () => {
    // M 4.0–5.5 is considered medium
    expect(getMagColor(4.5)).toBe('#fbbf24')
  })

  it('returns green for low magnitude', () => {
    // M < 4.0 is considered low impact
    expect(getMagColor(3.0)).toBe('#34d399')
  })
})