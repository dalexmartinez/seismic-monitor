import { ScatterplotLayer } from '@deck.gl/layers'
import type { Earthquake } from '@/types/earthquake'
import { getMagColor, getDepthRadius } from '@/utils/colorScale'

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
    ggetRadius: (d) => getDepthRadius(d.depth),
    getFillColor: (d) => {
      const base = getMagColor(d.magnitude)
      return d.id === selectedId ? SELECTED_COLOR : base
    },
    
    radiusUnits: 'pixels',
    radiusMinPixels: 5,
    radiusMaxPixels: 100,
    pickable: true,
    stroked: false,
    onHover: (info) => onHover(info.object ?? null, info),
    onClick: (info) => { if (info.object) onClick(info.object) },
    updateTriggers: {
      getFillColor: [selectedId],
      getRadius: earthquakes,
    },
  })
}