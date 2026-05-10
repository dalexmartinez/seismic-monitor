// Raw shape de la USGS GeoJSON Feed
export interface USGSFeature {
  type: 'Feature'
  properties: {
    mag: number
    place: string
    time: number       // epoch ms
    updated: number
    url: string
    sig: number        // significance 0-1000
    type: string       // 'earthquake' | 'quarry blast' | ...
    status: string
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number, number]  // [lng, lat, depth_km]
  }
  id: string
}

// Shape interno (procesado)
export interface Earthquake {
  id: string
  magnitude: number
  place: string
  time: Date
  longitude: number
  latitude: number
  depth: number        // km
  url: string
  significance: number
  type: string
}

export type TimeRange = '1day' | '7days' | '30days'
export type MagnitudeFilter = 'all' | '2.5+' | '4.5+' | 'significant'