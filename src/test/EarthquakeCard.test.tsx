import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { EarthquakeCard } from '@/components/sidebar/EarthquakeCard'
import type { Earthquake } from '@/types/earthquake'

// Fake earthquake — simulates what USGS would return after transformation
const mockEarthquake: Earthquake = {
  id: 'us7000abc1',
  magnitude: 4.7,
  place: '10km NNE of Guerrero, Mexico',
  time: new Date('2024-01-15T10:30:00Z'),
  longitude: -99.13,
  latitude: 19.43,
  depth: 32.4,
  url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us7000abc1',
  significance: 320,
  type: 'earthquake',
}

describe('EarthquakeCard', () => {
  it('renders magnitude correctly', () => {
    // Magnitude should always display with one decimal and M prefix
    render(<EarthquakeCard earthquake={mockEarthquake} isSelected={false} onClick={vi.fn()} />)
    expect(screen.getByText('M 4.7')).toBeInTheDocument()
  })

  it('renders place correctly', () => {
    // Location name from USGS should be visible in the card
    render(<EarthquakeCard earthquake={mockEarthquake} isSelected={false} onClick={vi.fn()} />)
    expect(screen.getByText('10km NNE of Guerrero, Mexico')).toBeInTheDocument()
  })

  it('renders depth badge correctly', () => {
    // Depth should be rounded and show km unit
    render(<EarthquakeCard earthquake={mockEarthquake} isSelected={false} onClick={vi.fn()} />)
    expect(screen.getByText('32 km')).toBeInTheDocument()
  })

  it('applies selected style when isSelected is true', () => {
    // Selected card should have a visible left border accent
    const { container } = render(
      <EarthquakeCard earthquake={mockEarthquake} isSelected={true} onClick={vi.fn()} />
    )
    const card = container.firstChild as HTMLElement
    expect(card.style.borderLeft).toBe('2px solid var(--card-selected-border)')
  })

  it('calls onClick when clicked', async () => {
    // Clicking a card should notify the parent component
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<EarthquakeCard earthquake={mockEarthquake} isSelected={false} onClick={handleClick} />)
    await user.click(screen.getByText('M 4.7'))
    expect(handleClick).toHaveBeenCalledWith(mockEarthquake)
  })
})