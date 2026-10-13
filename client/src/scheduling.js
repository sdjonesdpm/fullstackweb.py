export function getScheduleConflict(candidate, scheduledSessions) {
  if (scheduledSessions.some((session) => session.id === candidate.id)) {
    return 'duplicate'
  }

  const candidateStart = Date.parse(candidate.startTime)
  const candidateEnd = candidateStart + candidate.durationMinutes * 60_000
  const overlaps = scheduledSessions.some((session) => {
    const scheduledStart = Date.parse(session.startTime)
    const scheduledEnd = scheduledStart + session.durationMinutes * 60_000
    return candidateStart < scheduledEnd && scheduledStart < candidateEnd
  })

  return overlaps ? 'overlap' : null
}

export function getScheduleTotals(scheduledSessions) {
  const totals = scheduledSessions.reduce(
    (currentTotals, session) => ({
      count: currentTotals.count + 1,
      minutes: currentTotals.minutes + session.durationMinutes,
      cost: currentTotals.cost + session.price,
    }),
    { count: 0, minutes: 0, cost: 0 },
  )

  return {
    count: totals.count,
    hours: Number((totals.minutes / 60).toFixed(2)),
    cost: new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
    }).format(totals.cost),
  }
}
