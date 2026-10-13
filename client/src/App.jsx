import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './HomePage.jsx'
import SchedulePage from './SchedulePage.jsx'
import { getScheduleConflict } from './scheduling.js'

function App() {
  const [scheduledSessions, setScheduledSessions] = useState([])

  function scheduleSession(session) {
    setScheduledSessions((currentSessions) => (
      getScheduleConflict(session, currentSessions)
        ? currentSessions
        : [...currentSessions, session]
    ))
  }

  function removeScheduledSession(sessionId) {
    setScheduledSessions((currentSessions) => (
      currentSessions.filter((session) => session.id !== sessionId)
    ))
  }

  return (
    <BrowserRouter>
      <div className="site-shell">
        <nav className="app-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/schedule">Tutoring scheduler</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/schedule"
            element={(
              <SchedulePage
                scheduledSessions={scheduledSessions}
                onSchedule={scheduleSession}
                onRemove={removeScheduledSession}
              />
            )}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
