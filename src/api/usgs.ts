import type { Earthquake, TimeRange, MagnitudeFilter } from '@/types/earthquake'

const BASE = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary'

const FEED_URLS: Record<MagnitudeFilter, Record<TimeRange, string>> = {
  'all':         { '1day': `${BASE}/all_day.geojson`,         '7days': `${BASE}/all_week.geojson`,         '30days': `${BASE}/all_month.geojson` },
  '2.5+':        { '1day': `${BASE}/2.5_day.geojson`,         '7days': `${BASE}/2.5_week.geojson`,         '30days': `${BASE}/2.5_month.geojson` },
  '4.5+':        { '1day': `${BASE}/4.5_day.geojson`,         '7days': `${BASE}/4.5_week.geojson`,         '30days': `${BASE}/4.5_month.geojson` },
  'significant': { '1day': `${BASE}/significant_day.geojson`, '7days': `${BASE}/significant_week.geojson`, '30days': `${BASE}/significant_month.geojson` },
}

function transformFeature(f: USGSFeature): Earthquake {
  const [lng, lat, depth] = f.geometry.coordinates
  return {
    id:           f.id,
    magnitude:    f.properties.mag ?? 0,
    place:        f.properties.place,
    time:         new Date(f.properties.time),
    longitude:    lng,
    latitude:     lat,
    depth:        depth,
    url:          f.properties.url,
    significance: f.properties.sig,
    type:         f.properties.type,
  }
}

export async function fetchEarthquakes(
  magnitude: MagnitudeFilter,
  timeRange: TimeRange
): Promise<Earthquake[]> {
  const url = FEED_URLS[magnitude][timeRange]
  const res = await fetch(url)
  if (!res.ok) throw new Error(`USGS fetch failed: ${res.status}`)
  const data = await res.json()
  return (data.features as USGSFeature[]).map(transformFeature)
}