import { describe, it, expect } from 'vitest'
import { getMonday, getMondayString, formatWeekLabel, getWeekDates } from './date'

describe('getMonday', () => {
  it('returns Monday unchanged when input is Monday', () => {
    const monday = new Date('2026-03-02T10:00:00') // Monday
    const result = getMonday(monday)
    expect(result.toISOString().split('T')[0]).toBe('2026-03-02')
  })

  it('returns previous Monday for Wednesday', () => {
    const wednesday = new Date('2026-03-04T10:00:00') // Wednesday
    const result = getMonday(wednesday)
    expect(result.toISOString().split('T')[0]).toBe('2026-03-02')
  })

  it('returns previous Monday for Sunday', () => {
    const sunday = new Date('2026-03-08T10:00:00') // Sunday
    const result = getMonday(sunday)
    expect(result.toISOString().split('T')[0]).toBe('2026-03-02')
  })

  it('returns previous Monday for Saturday', () => {
    const saturday = new Date('2026-03-07T10:00:00') // Saturday
    const result = getMonday(saturday)
    expect(result.toISOString().split('T')[0]).toBe('2026-03-02')
  })

  it('sets time to midnight', () => {
    const friday = new Date('2026-03-06T15:30:00')
    const result = getMonday(friday)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
  })
})

describe('getMondayString', () => {
  it('returns ISO date string for Monday', () => {
    const thursday = new Date('2026-03-05T00:00:00')
    expect(getMondayString(thursday)).toBe('2026-03-02')
  })
})

describe('formatWeekLabel', () => {
  it('formats a week label', () => {
    const label = formatWeekLabel('2026-03-02')
    expect(label).toContain('March')
    expect(label).toContain('2')
  })
})

describe('getWeekDates', () => {
  it('returns 7 dates starting from the given Monday', () => {
    const dates = getWeekDates('2026-03-02')
    expect(dates).toHaveLength(7)
    expect(dates[0]).toBe('2026-03-02')
    expect(dates[6]).toBe('2026-03-08')
  })
})
