import ClientApp from '@/components/ClientApp'

// Disable static prerendering — site uses GSAP/Lenis/Motion which require browser APIs
export const dynamic = 'force-dynamic'

export default function Page() {
  return <ClientApp />
}
