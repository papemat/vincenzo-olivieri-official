'use client'

import dynamic from 'next/dynamic'

// App uses GSAP, Lenis, Motion — all require browser APIs, disable SSR
const App = dynamic(() => import('@/App'), { ssr: false })

export default function ClientApp() {
  return <App />
}
