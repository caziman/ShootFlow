export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #2a2118 0%, #0b0b0b 45%, #050505 100%)',
        color: '#f8f1e7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'Georgia, serif',
      }}
    >
      <section style={{ maxWidth: 900, textAlign: 'center' }}>
        <p
          style={{
            color: '#c9a96a',
            letterSpacing: 5,
            textTransform: 'uppercase',
            fontSize: 13,
            marginBottom: 18,
          }}
        >
          ShootFlow Studio
        </p>

        <h1 style={{ fontSize: 64, fontWeight: 400, marginBottom: 18 }}>
          Luxury booking for modern photographers.
        </h1>

        <p
          style={{
            color: '#b8aa98',
            fontSize: 20,
            lineHeight: 1.7,
            maxWidth: 680,
            margin: '0 auto 34px',
          }}
        >
          Book sessions, manage clients, and elevate your photography workflow.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <a href="/book" style={primaryButton}>
            Book a Session
          </a>

          <a href="/login" style={secondaryButton}>
            Studio Login
          </a>
        </div>
      </section>
    </main>
  )
}

const primaryButton = {
  padding: '15px 24px',
  borderRadius: 999,
  border: '1px solid #c9a96a',
  background: 'linear-gradient(135deg, #c9a96a, #8b6f3e)',
  color: '#090909',
  fontWeight: 800,
  textDecoration: 'none',
  textTransform: 'uppercase' as const,
}

const secondaryButton = {
  padding: '15px 24px',
  borderRadius: 999,
  border: '1px solid rgba(201, 169, 106, 0.45)',
  background: 'transparent',
  color: '#c9a96a',
  fontWeight: 800,
  textDecoration: 'none',
  textTransform: 'uppercase' as const,
}