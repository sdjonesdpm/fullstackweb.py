import catalog from './catalog.json'
import SessionCard from './SessionCard.jsx'
import { getScheduleConflict, getScheduleTotals } from './scheduling.js'

function SchedulePage({ scheduledSessions, onSchedule, onRemove }) {
  const totals = getScheduleTotals(scheduledSessions)

  return (
    <main className="lesson scheduler-page">
      <section className="intro">
        <p className="eyebrow"><span>01</span> TUTORING SESSION SCHEDULER</p>
        <h1>Make time to learn.</h1>
        <p className="lede">
          Choose a tutoring session to add it to your schedule. Sessions that overlap
          with one you have already scheduled are unavailable.
        </p>
      </section>

      <section className="scheduler-section" aria-labelledby="available-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>02</span> AVAILABLE SESSIONS</p>
            <h2 id="available-title">Find your next lesson.</h2>
          </div>
          <p className="section-note">
            Add sessions in <code>src/catalog.json</code>; the grid reads from that file.
          </p>
        </div>
        <div className="session-grid">
          {catalog.map((session) => {
            const conflict = getScheduleConflict(session, scheduledSessions)
            return (
              <SessionCard
                key={session.id}
                session={session}
                conflict={conflict}
                onSchedule={onSchedule}
              />
            )
          })}
        </div>
      </section>

      <section className="schedule-section" aria-labelledby="schedule-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>03</span> YOUR PLAN</p>
            <h2 id="schedule-title">Scheduled sessions</h2>
          </div>
          <p className="schedule-totals" role="status" aria-live="polite">
            <span><strong>{totals.count}</strong> sessions</span>
            <span><strong>{totals.hours}</strong> hours</span>
            <span><strong>{totals.cost}</strong> total</span>
          </p>
        </div>
        {scheduledSessions.length === 0 ? (
          <p className="empty-schedule">Your schedule is empty. Add a session to get started.</p>
        ) : (
          <ul className="scheduled-list">
            {scheduledSessions.map((session) => (
              <li key={session.id}>
                <div>
                  <strong>{session.subject}</strong>
                  <span>{session.tutor} · {new Date(session.startTime).toLocaleString()}</span>
                </div>
                <button type="button" className="remove-session" onClick={() => onRemove(session.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="footer"><span>SESSION CHECK</span><span>Data → state → schedule</span></footer>
    </main>
  )
}

export default SchedulePage
