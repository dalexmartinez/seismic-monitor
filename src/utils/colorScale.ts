import { scaleLinear } from 'd3-scale'
import { interpolateRgb } from 'd3-interpolate'

const depthColor = scaleLinear<string>()
  .domain([0, 70, 300, 700])
  .range(['#22d3ee', '#22d3ee', '#fbbf24', '#ef4444'])
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