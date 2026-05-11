
import { SeismicMap } from '@/components/map/SeismicMap'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { Topbar } from '@/components/ui/Topbar'
import { useEarthquakes } from '@/hooks/useEarthquakes'
import { Statusbar } from '@/components/ui/Statusbar'

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
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0f1a' }}>
      <Topbar />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <SeismicMap earthquakes={earthquakes} />
        <Sidebar earthquakes={earthquakes} />
      </div>
      <Statusbar />
    </div>
  )
}