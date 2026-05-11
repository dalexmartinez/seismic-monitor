import { scaleLinear } from 'd3-scale'
import { interpolateRgb } from 'd3-interpolate'

// Magnitude color scale — synchronized with CSS variables in index.css
// --mag-low: #a3e635 / --mag-mid: #fbbf24 / --mag-high: #ef4444
const MAG_LOW  = '#a3e635'  // M < 4.0 — low magnitude
const MAG_MID  = '#fbbf24'  // M 4.0–5.5 — medium magnitude
const MAG_HIGH = '#ef4444'  // M 5.5+ — high magnitude

// Depth radius scale — shallow = bigger, deep = smaller
// Inverted: more dangerous shallow earthquakes appear larger
const depthRadius = scaleLinear()
  .domain([0, 70, 300, 700])
  .range([50, 35, 20, 10])
  .clamp(true)
 
const magColor = scaleLinear<string>()
  .domain([2.5, 4.0, 5.5, 9])
  .range([MAG_LOW, MAG_LOW, MAG_MID, MAG_HIGH])
  .interpolate(interpolateRgb)

function parseColor(color: string): [number, number, number, number] {
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (rgbMatch) {
    return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3]), 255]
  }
  const hex = color.replace('#', '')
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
    255
  ]
}

export function getMagColor(magnitude: number): [number, number, number, number] {
  return parseColor(magColor(magnitude))
}

export function getDepthRadius(depth: number): number {
  return depthRadius(depth)
}