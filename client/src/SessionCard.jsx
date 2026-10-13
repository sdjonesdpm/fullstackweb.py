function SessionCard({ session, conflict, onSchedule }) {
  const startTime = new Date(session.startTime)
  const endTime = new Date(startTime.getTime() + session.durationMinutes * 60_000)
  const price = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(session.price)
  const buttonLabel = conflict === 'duplicate'
    ? 'Scheduled'
    : conflict === 'overlap'
      ? 'Overlaps scheduled session'
      : 'Schedule'

  return (
    <article className="session-card">
      <p className="session-subject">{session.subject}</p>
      <h3>With {session.tutor}</h3>
      <p className="session-time">
        {startTime.toLocaleDateString()} · {startTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
        {' – '}
        {endTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
      </p>
      <div className="session-details">
        <span>{session.durationMinutes} min</span>
        <strong>{price}</strong>
      </div>
      <button
        type="button"
        className="schedule-button"
        disabled={Boolean(conflict)}
        onClick={() => onSchedule(session)}
      >
        {buttonLabel}
      </button>
    </article>
  )
}

export default SessionCard
