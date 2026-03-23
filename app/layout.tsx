import type { Metadata } from 'next'
import { Bebas_Neue, Anton, Inter } from 'next/font/google'
import { GSAPProvider } from '@/components/GSAPProvider'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
})

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vincenzo Olivieri — Comico, Autore, Speaker',
  description: 'Sito ufficiale di Vincenzo Olivieri. Comico, caratterista, cantante, autore e speaker radiofonico. In tour con "Roba da matti 2025".',
  keywords: ['Vincenzo Olivieri', 'comico', 'stand-up', 'Roba da matti', 'tour 2025', 'Abruzzo'],
  openGraph: {
    title: 'Vincenzo Olivieri — Comico, Autore, Speaker',
    description: 'In tour con "Roba da matti 2025". Biglietti e spettacoli.',
    url: 'https://vincenzoolivieri.it',
    siteName: 'Vincenzo Olivieri',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vincenzo Olivieri — Comico, Autore, Speaker',
    description: 'In tour con "Roba da matti 2025".',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      className={`${bebasNeue.variable} ${anton.variable} ${inter.variable}`}
    >
      <head />
      <body>
        <div id="splash">
          <p className="splash-wordmark">Vincenzo<br /><em>Olivieri</em></p>
          <p className="splash-tagline">Comico · Autore · Speaker</p>
          <p className="splash-star">★ Roba da matti tour 2025 ★</p>
          <div className="splash-line" />
        </div>
        <GSAPProvider>
          {children}
        </GSAPProvider>
      </body>
    </html>
  )
}
