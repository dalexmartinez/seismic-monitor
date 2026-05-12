# Seismic Monitor

[Live Demo](https://seismic-monitor-mauve.vercel.app) · [USGS Data](https://earthquake.usgs.gov)

Real-time global earthquake activity monitor built with React, TypeScript and Deck.gl.

![Seismic Monitor](public/screenshot.png)

## Features

- 3D interactive globe with real-time earthquake data
- Points scaled by magnitude, colored by depth
- Automatic polling every 60 seconds
- Fly-to animation when selecting an earthquake
- Filter by time range and minimum magnitude
- Hourly frequency chart for the last 12 hours
- Live API status indicator

## Tech Stack

- **React 18** + **TypeScript** — UI and type safety
- **Deck.gl** — WebGL 3D globe rendering
- **React Query** — server state, caching and polling
- **Zustand** — client state management
- **Recharts** — data visualization
- **D3** — color and radius scales
- **Vite** — build tool

## Data Source

[USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/) — public API, no key required.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── api/          # USGS fetch and data transformation
├── components/
│   ├── map/      # Deck.gl globe, layers, legend, tabs
│   ├── sidebar/  # Filters, earthquake list, chart
│   └── ui/       # Topbar, statusbar, badge
├── hooks/        # useEarthquakes — React Query wrapper
├── store/        # Zustand filter store
├── types/        # TypeScript interfaces
└── utils/        # Color scale, formatters
```

## Testing

This project includes a unit and component test suite built with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com).

### Stack
- **Vitest** — test runner native to Vite
- **Testing Library** — component rendering and user interaction
- **jsdom** — browser environment simulation

### Coverage

| File | Statements | Branches | Functions | Lines |
|---|---|---|---|---|
| `filterStore.ts` | 100% | 100% | 100% | 100% |
| `FilterPanel.tsx` | 100% | 100% | 100% | 100% |
| `EarthquakeCard.tsx` | 100% | 100% | 100% | 100% |
| `Badge.tsx` | 100% | 100% | 100% | 100% |
| `formatters.ts` | 100% | 100% | 100% | 100% |
| `colorScale.ts` | 83% | 50% | 100% | 83% |
| **Total** | **96%** | **95.65%** | **100%** | **95.12%** |

### What is tested

- **Unit tests** — pure functions in `formatters.ts` and `colorScale.ts`
- **Store tests** — initial state and all setters in `filterStore.ts`
- **Component tests** — rendering, styles and user interactions in `Badge`, `EarthquakeCard` and `FilterPanel`

### Run tests

```bash
# Watch mode
npm run test

# Visual UI
npm run test:ui

# Coverage report
npm run test:coverage
```

## Author
dAlex Martínez
