export default function NotFound() {
  return (
    <div style={{ background: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '1.5rem' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(6rem, 20vw, 12rem)', lineHeight: 1, color: '#FFD700', margin: 0, userSelect: 'none' }}>
          404
        </p>
        <p style={{ color: '#9ca3af', fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>
          Pagina non trovata
        </p>
        <p style={{ color: '#4b5563', fontSize: '0.875rem', fontStyle: 'italic', marginBottom: '2.5rem' }}>
          (Neanche Vincenzo sa dove sei finito)
        </p>
        <a
          href="/"
          style={{ display: 'inline-block', padding: '1rem 2rem', background: '#fff', color: '#000', borderRadius: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', textDecoration: 'none' }}
        >
          Torna alla Home
        </a>
      </div>
    </div>
  )
}
