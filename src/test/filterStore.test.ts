import { describe, it, expect, beforeEach } from 'vitest'
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

describe('filterStore — initial state', () => {
  it('has correct default timeRange', () => {
    // Default period is 24 hours
    const { timeRange } = useFilterStore.getState()
    expect(timeRange).toBe('1day')
  })

  it('has correct default magnitude', () => {
    // Default minimum magnitude is M 2.5+
    const { magnitude } = useFilterStore.getState()
    expect(magnitude).toBe('2.5+')
  })

  it('has no selected earthquake by default', () => {
    // No earthquake should be highlighted on first load
    const { selectedId } = useFilterStore.getState()
    expect(selectedId).toBeNull()
  })

  it('has no fly target by default', () => {
    // Map should not animate on first load
    const { flyTarget } = useFilterStore.getState()
    expect(flyTarget).toBeNull()
  })
})

describe('filterStore — setters', () => {
  it('updates timeRange correctly', () => {
    // Changing the period should update the store and trigger a new API fetch
    const { setTimeRange } = useFilterStore.getState()
    setTimeRange('7days')
    expect(useFilterStore.getState().timeRange).toBe('7days')
  })

  it('updates magnitude correctly', () => {
    // Changing the magnitude filter should update the store and trigger a new API fetch
    const { setMagnitude } = useFilterStore.getState()
    setMagnitude('4.5+')
    expect(useFilterStore.getState().magnitude).toBe('4.5+')
  })

  it('updates selectedId correctly', () => {
    // Selecting an earthquake should store its ID for highlighting
    const { setSelectedId } = useFilterStore.getState()
    setSelectedId('us7000abc1')
    expect(useFilterStore.getState().selectedId).toBe('us7000abc1')
  })

  it('clears selectedId when set to null', () => {
    // Simulates deselecting an earthquake by clicking it again
    const { setSelectedId } = useFilterStore.getState()
    setSelectedId('us7000abc1')
    setSelectedId(null)
    expect(useFilterStore.getState().selectedId).toBeNull()
  })

  it('updates flyTarget correctly', () => {
    // Clicking an earthquake in the list should set the fly target
    // triggering a map animation to that location
    const { setFlyTarget } = useFilterStore.getState()
    setFlyTarget({ longitude: -99.13, latitude: 19.43 })
    expect(useFilterStore.getState().flyTarget).toEqual({
      longitude: -99.13,
      latitude: 19.43,
    })
  })
})