
import { SeismicMap } from '@/components/map/SeismicMap'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { Topbar } from '@/components/ui/Topbar'
import { Statusbar } from '@/components/ui/Statusbar'
import { useEarthquakes } from '@/hooks/useEarthquakes'

export default function App() {

  const { data: earthquakes = [], isLoading, isError } = useEarthquakes()

  if (isLoading) return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-base)',
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-md)',
    }}>
      Loading earthquakes...
    </div>
  )

  if (isError) return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-base)',
      color: 'var(--status-error)',
      fontSize: 'var(--text-md)',
    }}>
      Error connecting to USGS
    </div>
  )

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-base)',
    }}>
      <Topbar />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <SeismicMap earthquakes={earthquakes} />
        <Sidebar earthquakes={earthquakes} />
      </div>
      <Statusbar />
    </div>
  )
}