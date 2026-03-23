export default function NotFound() {
  return (
    <div style={{ background: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '6rem', color: '#FFD700', margin: 0 }}>404</h1>
        <p style={{ color: '#888' }}>Pagina non trovata</p>
        <a href="/" style={{ color: '#FFD700' }}>Torna alla home</a>
      </div>
    </div>
  )
}
