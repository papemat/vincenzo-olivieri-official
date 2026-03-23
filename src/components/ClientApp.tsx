'use client'

import dynamic from 'next/dynamic'
import type { Show, Quote, Video } from '@/types/sanity'

interface ClientAppProps {
  shows: Show[]
  quotes: Quote[]
  videos: Video[]
}

// App uses GSAP, Lenis, Motion — all require browser APIs, disable SSR
const App = dynamic(() => import('@/App'), { ssr: false })

export default function ClientApp({ shows, quotes, videos }: ClientAppProps) {
  return <App shows={shows} quotes={quotes} videos={videos} />
}
