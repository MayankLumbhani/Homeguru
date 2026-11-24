export const WEEKS_PER_BOOKING = 4;
export const MIN_SESSIONS_PER_WEEK = 1;
export const MAX_SESSIONS_PER_WEEK = 7;
export const DEFAULT_SESSIONS_PER_WEEK = 2;

export function getTotalSessions(sessionsPerWeek: number): number {
  return sessionsPerWeek * WEEKS_PER_BOOKING;
}

export function getTotalPrice(pricePerSession: number, sessionsPerWeek: number): number {
  return pricePerSession * getTotalSessions(sessionsPerWeek);
}
