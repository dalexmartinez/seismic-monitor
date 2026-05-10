import { SeismicMap } from '@/components/map/SeismicMap'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { useEarthquakes } from '@/hooks/useEarthquakes'

export default function App() {
  const { data: earthquakes = [], isLoading, isError } = useEarthquakes()

  if (isLoading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1a', color: '#94a3b8' }}>
      Cargando sismos...
    </div>
  )

  if (isError) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1a', color: '#ef4444' }}>
      Error conectando con USGS
    </div>
  )

  return (
    <div style={{ height: '100vh', display: 'flex', background: '#0a0f1a' }}>
      <SeismicMap earthquakes={earthquakes} />
      <Sidebar earthquakes={earthquakes} />
    </div>
  )
}