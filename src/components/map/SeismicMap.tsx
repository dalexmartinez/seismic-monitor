import { useState, useCallback, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { _GlobeView as GlobeView, FlyToInterpolator } from '@deck.gl/core'
import { GeoJsonLayer, SolidPolygonLayer } from '@deck.gl/layers'
import { easeCubicInOut } from 'd3-ease'
import { useQueryClient } from '@tanstack/react-query'
import type { Earthquake } from '@/types/earthquake'
import { createEarthquakeLayer } from './EarthquakeLayer'
import { useFilterStore } from '@/store/filterStore'
import { MapLegend } from './MapLegend'
import { TimeTabs } from './TimeTabs'

const INITIAL_VIEW = {
  longitude: -99.13,
  latitude: 19.43,
  zoom: 2,
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
  const [tooltip, setTooltip]     = useState<TooltipInfo | null>(null)
  const [viewState, setViewState] = useState(INITIAL_VIEW)
  const [worldData, setWorldData] = useState<any>(null)
  const { selectedId, setSelectedId, flyTarget } = useFilterStore()
  const queryClient = useQueryClient()

  useEffect(() => {
    fetch('/world.geojson')
      .then(r => r.json())
      .then(setWorldData)
  }, [])

  useEffect(() => {
    if (!flyTarget) return
    setViewState(prev => ({
      ...prev,
      longitude: flyTarget.longitude,
      latitude:  flyTarget.latitude,
      zoom:      3,
      transitionDuration:    2500,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
      transitionEasing:      easeCubicInOut,
    }))
  }, [flyTarget])

  function handleReset() {
    setViewState({
      ...INITIAL_VIEW,
      transitionDuration:    2500,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
      transitionEasing:      easeCubicInOut,
    } as typeof INITIAL_VIEW)
    queryClient.invalidateQueries({ queryKey: ['earthquakes'] })
  }

  const handleHover = useCallback((earthquake: Earthquake | null, event?: any) => {
    if (earthquake && event?.srcEvent) {
      setTooltip({ x: event.srcEvent.clientX, y: event.srcEvent.clientY, earthquake })
    } else {
      setTooltip(null)
    }
  }, [])

  const handleClick = useCallback((earthquake: Earthquake) => {
    setSelectedId(earthquake.id === selectedId ? null : earthquake.id)
  }, [selectedId, setSelectedId])

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
    createEarthquakeLayer(earthquakes, selectedId, handleHover, handleClick),
  ]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <DeckGL
        views={new GlobeView()}
        viewState={viewState}
        onViewStateChange={({ viewState: vs }) => {
          const { transitionDuration, transitionInterpolator, ...rest } = vs as any
          setViewState(prev => ({ ...prev, ...rest }))
        }}
        layers={layers}
        controller={true}
        parameters={{ clearColor: [0.04, 0.06, 0.10, 1] }}
      />

      <TimeTabs />

      <button
        onClick={handleReset}
        title="Reset view and refresh data"
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'var(--overlay-dark)',
          border: '0.5px solid var(--border-soft)',
          borderRadius: 'var(--radius-md)',
          padding: '5px 10px',
          color: 'var(--reset-color)',
          fontSize: 'var(--text-base)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          zIndex: 10,
          backdropFilter: 'blur(4px)',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--reset-color)')}
      >
        ↺ Reset
      </button>

      <MapLegend />

      {tooltip && (
        <div style={{
          position: 'fixed',
          left: tooltip.x + 12,
          top:  tooltip.y - 12,
          background: 'var(--bg-surface)',
          border: '0.5px solid var(--tooltip-border)',
          borderRadius: 'var(--radius-md)',
          padding: '6px 10px',
          pointerEvents: 'none',
          zIndex: 100,
        }}>
          <div style={{ color: 'var(--text-primary)', fontSize: 'var(--text-md)', fontWeight: 'var(--weight-medium)' }}>
            M {tooltip.earthquake.magnitude.toFixed(1)}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', marginTop: 2 }}>
            {tooltip.earthquake.place}
          </div>
          <div style={{ color: 'var(--text-subtle)', fontSize: 'var(--text-base)', marginTop: 1 }}>
            {tooltip.earthquake.depth} km depth
          </div>
        </div>
      )}
    </div>
  )
}