import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterPanel } from '@/components/sidebar/FilterPanel'
import { useFilterStore } from '@/store/filterStore'

// Reset store state before each test to avoid state leaking between tests
beforeEach(() => {
  useFilterStore.setState({
    timeRange:  '1day',
    magnitude:  '2.5+',
    selectedId: null,
    flyTarget:  null,
  })
})

describe('FilterPanel', () => {
  it('renders all time range options', () => {
    // User should be able to switch between 24h, 7 days and 30 days
    render(<FilterPanel />)
    expect(screen.getByText('24h')).toBeInTheDocument()
    expect(screen.getByText('7 days')).toBeInTheDocument()
    expect(screen.getByText('30 days')).toBeInTheDocument()
  })

  it('renders all magnitude options', () => {
    // User should be able to filter by All, M2.5+, M4.5+ and Notable
    render(<FilterPanel />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('M 2.5+')).toBeInTheDocument()
    expect(screen.getByText('M 4.5+')).toBeInTheDocument()
    expect(screen.getByText('Notable')).toBeInTheDocument()
  })

  it('updates timeRange in store when period pill is clicked', async () => {
    // Clicking a period pill should update the store and trigger a new API fetch
    const user = userEvent.setup()
    render(<FilterPanel />)
    await user.click(screen.getByText('7 days'))
    expect(useFilterStore.getState().timeRange).toBe('7days')
  })

  it('updates magnitude in store when magnitude pill is clicked', async () => {
    // Clicking a magnitude pill should update the store and trigger a new API fetch
    const user = userEvent.setup()
    render(<FilterPanel />)
    await user.click(screen.getByText('M 4.5+'))
    expect(useFilterStore.getState().magnitude).toBe('4.5+')
  })

  it('shows correct active pill for default timeRange', () => {
    // Active pill should reflect current store state — default is 24h
    render(<FilterPanel />)
    const pill = screen.getByText('24h')
    expect(pill).toHaveStyle({ color: 'var(--accent-blue-text)' })
  })

  it('shows correct active pill for default magnitude', () => {
    // Active pill should reflect current store state — default is M 2.5+
    render(<FilterPanel />)
    const pill = screen.getByText('M 2.5+')
    expect(pill).toHaveStyle({ color: 'var(--accent-blue-text)' })
  })
})