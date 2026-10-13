import assert from 'node:assert/strict'
import test from 'node:test'
import { getScheduleConflict, getScheduleTotals } from './scheduling.js'

const firstSession = {
  id: 'algebra',
  startTime: '2026-10-15T16:00:00-07:00',
  durationMinutes: 60,
  price: 40,
}

test('returns a duplicate conflict for a session already in the schedule', () => {
  assert.equal(getScheduleConflict(firstSession, [firstSession]), 'duplicate')
})

test('detects overlapping times even when session IDs differ', () => {
  const overlappingSession = {
    ...firstSession,
    id: 'geometry',
    startTime: '2026-10-15T16:30:00-07:00',
  }

  assert.equal(getScheduleConflict(overlappingSession, [firstSession]), 'overlap')
})

test('allows sessions that touch but do not overlap', () => {
  const nextSession = {
    ...firstSession,
    id: 'writing',
    startTime: '2026-10-15T17:00:00-07:00',
  }

  assert.equal(getScheduleConflict(nextSession, [firstSession]), null)
})

test('calculates scheduled session count, hours, and cost', () => {
  const secondSession = {
    id: 'biology',
    startTime: '2026-10-16T15:00:00-07:00',
    durationMinutes: 90,
    price: 55,
  }

  assert.deepEqual(getScheduleTotals([firstSession, secondSession]), {
    count: 2,
    hours: 2.5,
    cost: '$95.00',
  })
})
