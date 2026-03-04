/**
 * Returns the Monday of the week containing `date`.
 * Monday = day 1 in ISO week. Sunday (day 0) is treated as belonging to the previous week.
 */
export function getMonday(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay() // 0 = Sunday, 1 = Monday, ...
  const diff = day === 0 ? -6 : 1 - day // if Sunday, go back 6 days
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Returns ISO date string (YYYY-MM-DD) for the Monday of the week containing `date`.
 */
export function getMondayString(date: Date): string {
  return getMonday(date).toISOString().split('T')[0]
}

/**
 * Formats a week label like "Week of March 3".
 */
export function formatWeekLabel(weekStartDate: string): string {
  const date = new Date(weekStartDate + 'T00:00:00')
  return `Week of ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
}

/**
 * Returns an array of ISO date strings for each day of the week starting on `weekStartDate`.
 */
export function getWeekDates(weekStartDate: string): string[] {
  const start = new Date(weekStartDate + 'T00:00:00')
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    return d.toISOString().split('T')[0]
  })
}
