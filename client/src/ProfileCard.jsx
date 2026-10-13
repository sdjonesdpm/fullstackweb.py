function ProfileCard({ name, role, message, onSayHello }) {
  return (
    <section className="notice">
      <span className="notice-mark" aria-hidden="true">✳</span>
      <h3>{name}</h3>
      <p className="notice-role">{role}</p>
      <p aria-live="polite">{message}</p>
      <button type="button" onClick={onSayHello}>
        Say hello <span aria-hidden="true">↗</span>
      </button>
    </section>
  )
}

export default ProfileCard