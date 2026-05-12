import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    // Badge should display whatever text is passed as children
    render(<Badge>LIVE</Badge>)
    expect(screen.getByText('LIVE')).toBeInTheDocument()
  })

  it('renders with depth variant styles', () => {
    // Depth variant uses cyan color scheme for shallow earthquakes
    const { container } = render(<Badge variant="depth">32 km</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.style.background).toBe('var(--badge-depth-bg)')
  })

  it('renders with live variant styles', () => {
    // Live variant uses red color scheme for the live indicator
    const { container } = render(<Badge variant="live">● LIVE</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.style.background).toBe('var(--badge-live-bg)')
  })

  it('renders with default variant when no variant is specified', () => {
    // Default variant is a neutral gray — used for generic labels
    const { container } = render(<Badge>default</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.style.background).toBe('var(--badge-default-bg)')
  })
})