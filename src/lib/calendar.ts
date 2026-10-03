/** Local calendar anniversaries; elapsed hours use real time (including DST). */
function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setDate(1);
  next.setMonth(next.getMonth() + months);
  const last = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(date.getDate(), last));
  return next;
}
function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}
function calendarDays(start: Date, end: Date) {
  const utcDay = (d: Date) =>
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000;
  let days = Math.floor(utcDay(end) - utcDay(start));
  if (addDays(start, days) > end) days--;
  return Math.max(0, days);
}
export function relationshipDuration(
  startValue: string | Date,
  now = new Date(),
) {
  const start = new Date(startValue);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(now.getTime()))
    throw new Error("Invalid relationship date");
  if (now < start) now = start;
  let totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    now.getMonth() -
    start.getMonth();
  if (addMonths(start, totalMonths) > now) totalMonths--;
  totalMonths = Math.max(0, totalMonths);
  const monthAnchor = addMonths(start, totalMonths);
  const days = calendarDays(monthAnchor, now);
  const secondsLeft = Math.floor(
    (now.getTime() - addDays(monthAnchor, days).getTime()) / 1000,
  );
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days,
    hours: Math.floor(secondsLeft / 3600),
    minutes: Math.floor(secondsLeft / 60) % 60,
    seconds: secondsLeft % 60,
    totalMonths,
    totalDays: calendarDays(start, now),
    totalHours: Math.floor((now.getTime() - start.getTime()) / 3600000),
  };
}
