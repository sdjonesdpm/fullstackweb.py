import { useState } from 'react'
import ProfileCard from './ProfileCard.jsx'

const codeLines = [
  { language: 'HTML', text: '<section class="notice">' },
  { language: 'HTML', text: '  <p id="message">The page is ready.</p>' },
  { language: 'HTML', text: '  <button id="hello-button">Say hello</button>' },
  { language: 'HTML', text: '</section>' },
  { language: 'CSS', text: '.notice {' },
  { language: 'CSS', text: '  padding: 1rem;' },
  { language: 'CSS', text: '  background: #e8f3ec;' },
  { language: 'CSS', text: '}' },
  { language: 'JS', text: "const button = document.querySelector('#hello-button')" },
  { language: 'JS', text: "button.addEventListener('click', () => {" },
  { language: 'JS', text: "  document.querySelector('#message').textContent = 'Hello!'" },
  { language: 'JS', text: '})' },
]

function HomePage() {
  const [message, setMessage] = useState('The page is ready.')
  const [answer, setAnswer] = useState('')

  const answers = [
    'Only the section with id="notice".',
    'Every element with class="notice".',
    'Every element named notice.',
  ]

  return (
    <main className="lesson">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Web basics home">web<span>/</span>basics</a>
        <span className="topbar-note">A tiny lesson in how the web works</span>
      </header>

      <section className="intro" id="top">
        <p className="eyebrow"><span>01</span> THE WEB, IN A MOMENT</p>
        <h1>A page is a conversation.</h1>
        <p className="lede">Your browser asks for something. A server sends it back. Your browser turns that reply into the page you see.</p>
      </section>

      <section className="cycle" aria-label="Request and response cycle">
        <article className="cycle-step">
          <span className="step-number">01</span>
          <h2>You ask</h2>
          <p>You type an address or click a link. The browser sends a <strong>request</strong> to a server.</p>
        </article>
        <span className="cycle-arrow" aria-hidden="true">→</span>
        <article className="cycle-step">
          <span className="step-number">02</span>
          <h2>It replies</h2>
          <p>The server sends a <strong>response</strong>, often with HTML, CSS, JavaScript, and images.</p>
        </article>
        <span className="cycle-arrow" aria-hidden="true">→</span>
        <article className="cycle-step">
          <span className="step-number">03</span>
          <h2>You see it</h2>
          <p>The browser reads the files, draws the page, and runs its JavaScript. Clicks can start another request.</p>
        </article>
      </section>

      <section className="build-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>02</span> ONE SMALL PAGE</p>
            <h2>Three ingredients, one result.</h2>
          </div>
          <p className="section-note">The browser combines these pieces to make a working page.</p>
        </div>

        <div className="workbench">
          <div className="preview">
            <div className="preview-bar"><span className="window-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>LIVE PREVIEW</span></div>
            <div className="preview-content">
              <ProfileCard
                name="Page preview"
                role="HTML + CSS + JavaScript"
                message={message}
                onSayHello={() => setMessage('Hello!')}
              />
              <p className="preview-caption">Click the button. JavaScript changes the message.</p>
            </div>
          </div>

          <div className="code-panel" aria-label="Annotated page code">
            <div className="code-heading"><span>THE SOURCE</span><span>12 LINES</span></div>
            <ol className="code-lines">
              {codeLines.map((line, index) => (
                <li className={`code-line ${line.language.toLowerCase()}`} key={`${line.language}-${index}`}>
                  <span className="line-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="language-tag">{line.language}</span>
                  <code>{line.text}</code>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="question" aria-labelledby="question-title">
        <div className="question-label"><span>03</span> QUICK CHECK</div>
        <div className="question-content">
          <h2 id="question-title">What does <code>.notice</code> match, and why?</h2>
          <div className="answers" role="group" aria-label="Choose an answer">
            {answers.map((choice, index) => (
              <button
                className={answer === choice ? 'answer selected' : 'answer'}
                type="button"
                key={choice}
                aria-pressed={answer === choice}
                onClick={() => setAnswer(choice)}
              >
                <span className="answer-key">{String.fromCharCode(65 + index)}</span>
                {choice}
              </button>
            ))}
          </div>
          {answer && (
            <p className={answer === answers[1] ? 'feedback correct' : 'feedback'} role="status">
              {answer === answers[1]
                ? 'Exactly. A dot selects a class, and class="notice" can be used on any HTML element.'
                : 'Not quite. In CSS, a dot points to a class name. Look for class="notice" in the HTML.'}
            </p>
          )}
        </div>
      </section>

      <footer className="footer"><span>END OF LESSON</span><span>Request → response → page</span></footer>
    </main>
  )
}

export default HomePage
