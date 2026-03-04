import { getMondayString } from '@/lib/date'

/**
 * Returns the ISO date string (YYYY-MM-DD) for this week's Monday.
 * Stable reference — doesn't change during a session.
 */
export function useCurrentWeekStart(): string {
  return getMondayString(new Date())
}
