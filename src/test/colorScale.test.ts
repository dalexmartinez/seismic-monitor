import { describe, it, expect } from 'vitest'
import { getMagColor, getDepthRadius } from '@/utils/colorScale'

describe('getDepthRadius', () => {
  it('returns maximum radius for surface earthquakes', () => {
    // 0 km depth — most dangerous, should be largest point
    const radius = getDepthRadius(0)
    expect(radius).toBe(50)
  })

  it('returns minimum radius for deep earthquakes', () => {
    // 700+ km depth — clamped to minimum size
    const radius = getDepthRadius(700)
    expect(radius).toBe(10)
  })

  it('returns intermediate radius for mid-depth earthquakes', () => {
    // 70 km is the boundary between shallow and intermediate
    const radius = getDepthRadius(70)
    expect(radius).toBe(35)
  })

  it('clamps values beyond 700km to minimum', () => {
    // Values beyond domain should not break the scale
    const radius = getDepthRadius(1000)
    expect(radius).toBe(10)
  })
})

describe('getMagColor', () => {
  it('returns a valid RGBA array for any magnitude', () => {
    // Deck.gl requires [R, G, B, A] format
    const color = getMagColor(4.0)
    expect(color).toHaveLength(4)
    expect(color[3]).toBe(255) // Alpha should always be full opacity
  })

  it('returns values within valid RGB range', () => {
    // Each channel must be 0-255
    const color = getMagColor(6.0)
    color.forEach(channel => {
      expect(channel).toBeGreaterThanOrEqual(0)
      expect(channel).toBeLessThanOrEqual(255)
    })
  })

  it('returns different colors for different magnitudes', () => {
    // Low and high magnitude should produce visually distinct colors
    const low  = getMagColor(2.5)
    const high = getMagColor(8.0)
    expect(low).not.toEqual(high)
  })
})