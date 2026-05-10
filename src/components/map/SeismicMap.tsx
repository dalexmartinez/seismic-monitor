import { useState, useCallback, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { _GlobeView as GlobeView } from '@deck.gl/core'
import type { Earthquake } from '@/types/earthquake'
import { createEarthquakeLayer } from './EarthquakeLayer'
import { useFilterStore } from '@/store/filterStore'
import { GeoJsonLayer, SolidPolygonLayer } from '@deck.gl/layers'

const INITIAL_VIEW = {
  longitude: -99.13,
  latitude: 19.43,
  zoom: 1.5,
  minZoom: 0.5,
  maxZoom: 8,
}

interface Props {
  earthquakes: Earthquake[]
}

interface TooltipInfo {
  x: number
  y: number
  earthquake: Earthquake
}

export function SeismicMap({ earthquakes }: Props) {
  const { selectedId, setSelectedId } = useFilterStore()
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null)
  const [viewState, setViewState] = useState(INITIAL_VIEW)

    const handleHover = useCallback((earthquake: Earthquake | null, event?: any) => {
        if (earthquake && event?.srcEvent) {
        setTooltip({
            x: event.srcEvent.clientX,
            y: event.srcEvent.clientY,
            earthquake,
        })
        } else {
        setTooltip(null)
        }
    }, [])

    const handleClick = useCallback((earthquake: Earthquake) => {
        setSelectedId(earthquake.id === selectedId ? null : earthquake.id)
    }, [selectedId, setSelectedId])

    const [worldData, setWorldData] = useState<any>(null)
        useEffect(() => {
        fetch('/world.geojson')
            .then(r => r.json())
            .then(setWorldData)
    }, [])

    const layers = [
    new SolidPolygonLayer({
        id: 'globe-surface',
        data: [{ polygon: [[-180, 90], [180, 90], [180, -90], [-180, -90], [-180, 90]] }],
        getPolygon: (d: any) => d.polygon,
        getFillColor: [13, 24, 46, 255],
        stroked: false,
    }),
    new GeoJsonLayer({
        id: 'countries',
        data: worldData,
        filled: true,
        stroked: true,
        getFillColor: [20, 35, 60, 255],
        getLineColor: [80, 120, 180, 120],
        lineWidthMinPixels: 0.5,
        pickable: false,
    }),
    createEarthquakeLayer(earthquakes, selectedId, handleHover, handleClick)
    ]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

     <DeckGL
        views={new GlobeView()}
        viewState={viewState}
        onViewStateChange={({ viewState: vs }) => {
            const { transitionDuration, transitionInterpolator, ...rest } = vs as any
            setViewState(rest)
        }}
        layers={layers}
        controller={true}
        parameters={{
            clearColor: [0.04, 0.06, 0.10, 1]
        }}
    />

      {tooltip && (
        <div style={{
          position: 'fixed',
          left: tooltip.x + 12,
          top: tooltip.y - 12,
          background: '#0d1422',
          border: '0.5px solid rgba(255,255,255,0.12)',
          borderRadius: 6,
          padding: '6px 10px',
          pointerEvents: 'none',
          zIndex: 100,
        }}>
          <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 500 }}>
            M {tooltip.earthquake.magnitude.toFixed(1)}
          </div>
          <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>
            {tooltip.earthquake.place}
          </div>
          <div style={{ color: '#475569', fontSize: 11, marginTop: 1 }}>
            {tooltip.earthquake.depth} km profundidad
          </div>
        </div>
      )}
    </div>
  )
}