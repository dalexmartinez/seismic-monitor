import { ScatterplotLayer } from '@deck.gl/layers'
import type { Earthquake } from '@/types/earthquake'
import { getDepthColor, getMagRadius } from '@/utils/colorScale'

// Selected point color — white highlight
// Point stroke — synchronized with --border-soft in index.css
const SELECTED_COLOR: [number, number, number, number] = [255, 255, 255, 240]
const STROKE_COLOR:   [number, number, number, number] = [255, 255, 255, 30]

export function createEarthquakeLayer(
  earthquakes: Earthquake[],
  selectedId: string | null,
  onHover: (earthquake: Earthquake | null, event?: any) => void,
  onClick: (earthquake: Earthquake) => void
) {
  return new ScatterplotLayer<Earthquake>({
    id: 'earthquakes',
    data: earthquakes,
    getPosition: (d) => [d.longitude, d.latitude],
    getRadius:   (d) => getMagRadius(d.magnitude),
    getFillColor: (d) => {
      const base = getDepthColor(d.depth)
      return d.id === selectedId ? SELECTED_COLOR : base
    },
    radiusUnits: 'pixels',
    pickable: true,
    stroked: true,
    getLineColor: STROKE_COLOR,
    lineWidthMinPixels: 0.5,
    onHover: (info) => onHover(info.object ?? null, info),
    onClick: (info) => { if (info.object) onClick(info.object) },
    updateTriggers: {
      getFillColor: [selectedId],
    },
  })
}