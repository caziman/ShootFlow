export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #2a2118 0%, #0b0b0b 45%, #050505 100%)',
        color: '#f8f1e7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'Georgia, serif',
        textAlign: 'center',
      }}
    >
      <section>
        <p style={{ color: '#c9a96a', letterSpacing: 4, textTransform: 'uppercase' }}>
          Payment Received
        </p>
        <h1 style={{ fontSize: 54, fontWeight: 400 }}>Your session request is confirmed.</h1>
        <p style={{ color: '#b8aa98', fontSize: 18 }}>
          Thank you. We’ll follow up shortly with next steps.
        </p>
      </section>
    </main>
  )
}