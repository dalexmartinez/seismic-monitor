import { scaleLinear } from 'd3-scale'
import { interpolateRgb } from 'd3-interpolate'

// Depth color scale — synchronized with CSS variables in index.css
// --depth-shallow: #22d3ee / --depth-mid: #fbbf24 / --depth-deep: #ef4444
const DEPTH_SHALLOW = '#22d3ee'
const DEPTH_MID     = '#fbbf24'
const DEPTH_DEEP    = '#ef4444'

const depthColor = scaleLinear<string>()
  .domain([0, 70, 300, 700])
  .range([DEPTH_SHALLOW, DEPTH_SHALLOW, DEPTH_MID, DEPTH_DEEP])
  .interpolate(interpolateRgb)

const magRadius = scaleLinear()
  .domain([2.5, 5, 7, 9])
  .range([4, 10, 22, 40])
  .clamp(true)

function hexToRgb(hex: string): [number, number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b, 200]
}

export function getDepthColor(depth: number): [number, number, number, number] {
  return hexToRgb(depthColor(depth))
}

export function getMagRadius(magnitude: number): number {
  return magRadius(magnitude)
}