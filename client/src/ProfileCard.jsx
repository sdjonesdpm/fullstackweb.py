function ProfileCard({ message, onSayHello }) {
  return (
    <section className="notice">
      <span className="notice-mark" aria-hidden="true">✳</span>
      <p aria-live="polite">{message}</p>
      <button type="button" onClick={onSayHello}>
        Say hello <span aria-hidden="true">↗</span>
      </button>
    </section>
  )
}

export default ProfileCard