import { ScatterplotLayer } from '@deck.gl/layers'
import type { Earthquake } from '@/types/earthquake'
import { getDepthColor, getMagRadius } from '@/utils/colorScale'

export function createEarthquakeLayer(
  earthquakes: Earthquake[],
  selectedId: string | null,
  onHover: (earthquake: Earthquake | null) => void,
  onClick: (earthquake: Earthquake) => void
) {
  return new ScatterplotLayer<Earthquake>({
    id: 'earthquakes',
    data: earthquakes,
    getPosition: (d) => [d.longitude, d.latitude],
    getRadius: (d) => getMagRadius(d.magnitude),
    getFillColor: (d) => {
      const base = getDepthColor(d.depth)
      const isSelected = d.id === selectedId
      return isSelected ? [255, 255, 255, 240] : base
    },
    radiusUnits: 'pixels',
    pickable: true,
    stroked: true,
    getLineColor: [255, 255, 255, 30],
    lineWidthMinPixels: 0.5,
    onHover: (info) => onHover(info.object ?? null),
    onClick: (info) => { if (info.object) onClick(info.object) },
    updateTriggers: {
      getFillColor: [selectedId],
    },
  })
}