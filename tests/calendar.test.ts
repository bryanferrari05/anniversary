import { test } from "node:test";
import assert from "node:assert/strict";
import {
  relationshipDuration,
  relationshipCounterDisplay,
} from "../src/lib/calendar.ts";
test("anniversary, before anniversary, and live clock", () => {
  const d = relationshipDuration(
    "2024-10-04T00:00:00",
    new Date("2026-10-03T12:42:08"),
  );
  assert.deepEqual(
    [d.years, d.months, d.days, d.hours, d.minutes, d.seconds],
    [1, 11, 29, 12, 42, 8],
  );
  const a = relationshipDuration(
    "2024-10-04T00:00:00",
    new Date("2026-10-04T00:00:00"),
  );
  assert.deepEqual(
    [a.years, a.months, a.days, a.totalMonths, a.totalDays],
    [2, 0, 0, 24, 730],
  );
});
test("month ends and leap anniversaries clamp to valid dates", () => {
  const jan = relationshipDuration(
    "2025-01-31T00:00:00",
    new Date("2025-02-28T00:00:00"),
  );
  assert.equal(jan.totalMonths, 1);
  assert.equal(jan.days, 0);
  const leap = relationshipDuration(
    "2024-02-29T00:00:00",
    new Date("2025-02-28T00:00:00"),
  );
  assert.equal(leap.years, 1);
  assert.equal(leap.days, 0);
});
test("future start is clamped to zero, invalid dates are rejected", () => {
  const future = relationshipDuration("2027-01-01", new Date("2026-01-01"));
  assert.ok(Object.values(future).every((v) => v === 0));
  assert.throws(() => relationshipDuration("invalid"));
});
test("calendar days remain correct through daylight saving changes", () => {
  process.env.TZ = "Europe/Rome";
  const spring = relationshipDuration(
    "2025-03-29T00:00:00",
    new Date("2025-03-31T00:00:00"),
  );
  assert.equal(spring.days, 2);
  assert.equal(spring.totalDays, 2);
  assert.equal(spring.totalHours, 47);
  const autumn = relationshipDuration(
    "2025-10-25T00:00:00",
    new Date("2025-10-27T00:00:00"),
  );
  assert.equal(autumn.days, 2);
  assert.equal(autumn.totalHours, 49);
});

test("anniversary display switches at midnight and stays years-only for October 4", () => {
  const start = "2024-10-04T00:00:00";
  const before = relationshipCounterDisplay(
    relationshipDuration(start, new Date("2026-10-03T23:59:59")),
  );
  assert.equal(before.isAnniversaryDay, false);
  for (const stamp of [
    "2026-10-04T00:00:00",
    "2026-10-04T12:30:42",
    "2026-10-04T23:59:59",
  ]) {
    const display = relationshipCounterDisplay(
      relationshipDuration(start, new Date(stamp)),
    );
    assert.equal(display.isAnniversaryDay, true, stamp);
    assert.deepEqual(display.units, [{ value: 2, label: "anni" }], stamp);
  }
  const nextDay = relationshipDuration(start, new Date("2026-10-05T08:12:34"));
  const display = relationshipCounterDisplay(nextDay);
  assert.equal(display.isAnniversaryDay, false);
  assert.deepEqual(display.units, [
    { value: 2, label: "anni" },
    { value: 1, label: "giorno" },
  ]);
  assert.deepEqual(
    [nextDay.hours, nextDay.minutes, nextDay.seconds],
    [8, 12, 34],
  );
});

test("the anniversary is calculated each year rather than hardcoded to two", () => {
  const third = relationshipCounterDisplay(
    relationshipDuration(
      "2024-10-04T00:00:00",
      new Date("2027-10-04T19:00:00"),
    ),
  );
  assert.equal(third.isAnniversaryDay, true);
  assert.deepEqual(third.units, [{ value: 3, label: "anni" }]);
  const month = relationshipCounterDisplay(
    relationshipDuration(
      "2024-10-04T00:00:00",
      new Date("2026-11-04T12:00:00"),
    ),
  );
  assert.equal(month.isAnniversaryDay, false);
});
