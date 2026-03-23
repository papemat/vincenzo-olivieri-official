# Vincenzo Olivieri — Prod-Ready: Next.js + Sanity + GitHub + Vercel

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the Vite/React one-page portfolio to Next.js 15, integrate Sanity CMS for shows/quotes/videos, push to GitHub, and link to the existing Vercel project for auto-deploy.

**Architecture:** Next.js 15 App Router — `app/page.tsx` is a Server Component that fetches Sanity data and passes it as props to Client Components. All components with GSAP/Lenis/Motion get `'use client'`. The splash screen HTML moves into `app/layout.tsx`. Fonts loaded via `next/font/google`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, GSAP 3 + @gsap/react, Lenis, Motion, Sanity (client + Studio), GitHub MCP, Vercel

---

## Task 1: Git init + GitHub repo + first commit

**Files:**
- Create: `.gitignore`

**Step 1: Init git**
```bash
cd /Users/matteopapetti/Documents/ClaudeCode/Code/vincenzo-olivieri-official
git init
git branch -M main
```

**Step 2: Create `.gitignore`**
```
node_modules/
.next/
dist/
.env.local
.env*.local
*.log
.DS_Store
.vercel
```

**Step 3: Create repo via GitHub MCP**
Use `mcp__github__create_repository` with:
- name: `vincenzo-olivieri-official`
- private: false
- description: "Sito ufficiale di Vincenzo Olivieri — Comico, Autore, Speaker"

**Step 4: First commit + push**
```bash
git add .
git commit -m "feat: initial commit — Vite+React portfolio site"
git remote add origin https://github.com/papemat/vincenzo-olivieri-official.git
git push -u origin main
```

**Step 5: Verify**
- GitHub repo visible at github.com/papemat/vincenzo-olivieri-official
- All source files present

---

## Task 2: Install Next.js 15, remove Vite

**Files:**
- Modify: `package.json`
- Delete: `vite.config.ts`, `index.html`
- Create: `next.config.ts`, `tsconfig.json` (replace)

**Step 1: Install Next.js deps, remove Vite**
```bash
npm install next@15 @next/font
npm uninstall vite @vitejs/plugin-react @tailwindcss/vite
```

**Step 2: Update `package.json` scripts**
Replace the `scripts` section:
```json
{
  "name": "vincenzo-olivieri-official",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**Step 3: Create `next.config.ts`**
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}

export default nextConfig
```

**Step 4: Replace `tsconfig.json`**
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Step 5: Delete Vite-specific files**
```bash
rm vite.config.ts index.html
```

---

## Task 3: Create Next.js `app/` directory structure

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css` (move from `src/index.css`)

**Step 1: Create `app/layout.tsx`**
This replaces `index.html` + `src/main.tsx`. It includes the splash screen, font loading, and GSAP global setup.

```typescript
import type { Metadata } from 'next'
import { Bebas_Neue, Anton, Inter } from 'next/font/google'
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
        {/* Splash screen — pure HTML/CSS, covers JS parse time */}
        <div id="splash">
          <p className="splash-wordmark">Vincenzo<br /><em>Olivieri</em></p>
          <p className="splash-tagline">Comico · Autore · Speaker</p>
          <p className="splash-star">★ Roba da matti tour 2025 ★</p>
          <div className="splash-line" />
        </div>
        {children}
      </body>
    </html>
  )
}
```

**Step 2: Create `app/page.tsx`** (Server Component — fetches Sanity data)
```typescript
import App from '@/components/App'

export default function Page() {
  // Sanity data will be fetched here in Task 7
  // For now, pass empty arrays to accept the component signature
  return <App />
}
```

**Step 3: Move CSS**
```bash
cp src/index.css app/globals.css
```
Then add the splash screen styles to `app/globals.css` (from the old `index.html` `<style>` block — copy the `#splash`, `.splash-*` CSS into globals.css).

---

## Task 4: Add GSAP global setup (replaces `src/main.tsx`)

In Next.js, there's no `main.tsx`. GSAP must be registered once globally using a Client Component.

**Files:**
- Create: `src/components/GSAPProvider.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create `src/components/GSAPProvider.tsx`**
```typescript
'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.ticker.lagSmoothing(0)
  }, [])

  return <>{children}</>
}
```

**Step 2: Wrap children in `app/layout.tsx`**
```typescript
import { GSAPProvider } from '@/components/GSAPProvider'

// Inside RootLayout body:
<body>
  <div id="splash">...</div>
  <GSAPProvider>
    {children}
  </GSAPProvider>
</body>
```

---

## Task 5: Migrate `src/App.tsx` → `src/components/App.tsx` as Client Component

The root App component uses hooks (`useLenis`, `useEffect`) so it must be a Client Component.

**Files:**
- Modify: `src/App.tsx` → rename/keep as `src/components/App.tsx` (it's already there)

**Step 1: Add `'use client'` at top of `src/App.tsx`**
Add as first line:
```typescript
'use client'
```

**Step 2: Change lazy imports to `next/dynamic`**
Replace all `lazy()` calls:
```typescript
import dynamic from 'next/dynamic'

const About = dynamic(() => import('./About'), { ssr: false })
const Shows = dynamic(() => import('./Shows'), { ssr: false })
const Videoflix = dynamic(() => import('./Videoflix'), { ssr: false })
const Quotes = dynamic(() => import('./Quotes'), { ssr: false })
const Podcast = dynamic(() => import('./Podcast'), { ssr: false })
const Newsletter = dynamic(() => import('./Newsletter'), { ssr: false })
const Contact = dynamic(() => import('./Contact'), { ssr: false })
const Footer = dynamic(() => import('./Footer'), { ssr: false })
const SectionDivider = dynamic(() => import('./SectionDivider'), { ssr: false })
```

**Step 3: Remove the `Suspense` import** (not needed with `next/dynamic`)

**Step 4: Update `app/page.tsx` to import App**
```typescript
import App from '@/components/App'

export default function Page() {
  return <App />
}
```

Note: `src/App.tsx` stays in `src/components/` — it's already there and imported as `@/components/App`.

---

## Task 6: Add `'use client'` to all components with browser APIs/hooks

All components using GSAP, Lenis, Motion, refs, useState, useEffect need `'use client'` as first line.

**Files to modify** (add `'use client'` as line 1):
- `src/components/Hero.tsx`
- `src/components/Navbar.tsx`
- `src/components/Shows.tsx`
- `src/components/Quotes.tsx`
- `src/components/Videoflix.tsx`
- `src/components/Podcast.tsx`
- `src/components/About.tsx`
- `src/components/Newsletter.tsx`
- `src/components/Contact.tsx`
- `src/components/Footer.tsx`
- `src/components/CustomCursor.tsx`
- `src/components/EasterEggs.tsx`
- `src/components/TextReveal.tsx`
- `src/components/ScrollNumber.tsx`
- `src/components/SectionDivider.tsx`
- `src/hooks/useLenis.ts`

**Step 1: Add `'use client'` to each file listed above**
For each file, prepend `'use client'\n\n` before the existing content.

**Step 2: Fix `src/index.css` import in App.tsx**
Change:
```typescript
import './index.css'
```
Remove this line (CSS is now in `app/globals.css`).

**Step 3: Verify build**
```bash
npm run build
```
Expected: build completes without errors.

---

## Task 7: Setup Sanity project

**Files:**
- Create: `sanity.config.ts`
- Create: `sanity/lib/client.ts`
- Create: `sanity/schemaTypes/show.ts`
- Create: `sanity/schemaTypes/quote.ts`
- Create: `sanity/schemaTypes/video.ts`
- Create: `sanity/schemaTypes/index.ts`
- Create: `.env.local`

**Step 1: Install Sanity**
```bash
npm install next-sanity @sanity/client @sanity/image-url
```

**Step 2: Init Sanity project**
```bash
npx sanity@latest init --no-typescript
```
When prompted:
- Create new project: yes
- Project name: `vincenzo-olivieri`
- Dataset: `production`
- Project output path: leave as `./`

Note the `projectId` printed — you'll need it for env vars.

**Step 3: Create `sanity/lib/client.ts`**
```typescript
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

**Step 4: Create `sanity/schemaTypes/show.ts`**
```typescript
import { defineType, defineField } from 'sanity'

export const show = defineType({
  name: 'show',
  title: 'Spettacolo',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo', type: 'string', validation: r => r.required() }),
    defineField({ name: 'date', title: 'Data', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'location', title: 'Città', type: 'string', validation: r => r.required() }),
    defineField({ name: 'venue', title: 'Luogo / Teatro', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'status',
      title: 'Stato',
      type: 'string',
      options: { list: ['Disponibile', 'Ultimi Posti', 'Sold Out'] },
      initialValue: 'Disponibile',
    }),
    defineField({ name: 'ticketUrl', title: 'Link Biglietti', type: 'url' }),
  ],
  orderings: [{ title: 'Data', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
})
```

**Step 5: Create `sanity/schemaTypes/quote.ts`**
```typescript
import { defineType, defineField } from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Recensione',
  type: 'document',
  fields: [
    defineField({ name: 'text', title: 'Testo', type: 'text', validation: r => r.required() }),
    defineField({ name: 'author', title: 'Autore / Fonte', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', title: 'Ruolo / Tipo', type: 'string' }),
  ],
})
```

**Step 6: Create `sanity/schemaTypes/video.ts`**
```typescript
import { defineType, defineField } from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo', type: 'string', validation: r => r.required() }),
    defineField({ name: 'category', title: 'Categoria', type: 'string' }),
    defineField({ name: 'duration', title: 'Durata (es. 12:45)', type: 'string' }),
    defineField({ name: 'thumbnailUrl', title: 'URL Thumbnail', type: 'url', validation: r => r.required() }),
    defineField({ name: 'videoUrl', title: 'URL Video', type: 'url' }),
    defineField({ name: 'featured', title: 'Video in evidenza', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Ordine', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Ordine', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
```

**Step 7: Create `sanity/schemaTypes/index.ts`**
```typescript
import { show } from './show'
import { quote } from './quote'
import { video } from './video'

export const schemaTypes = [show, quote, video]
```

**Step 8: Create `sanity.config.ts`**
```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'vincenzo-olivieri',
  title: 'Vincenzo Olivieri CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
```

**Step 9: Create `.env.local`**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
```
Replace `<your-project-id>` with the ID from Step 2.

---

## Task 8: Embed Sanity Studio at `/studio`

**Files:**
- Create: `app/studio/[[...tool]]/page.tsx`

**Step 1: Create Studio route**
```typescript
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

**Step 2: Install next-sanity**
```bash
npm install next-sanity
```

**Step 3: Verify locally**
```bash
npm run dev
```
Navigate to `http://localhost:3000/studio` — Sanity Studio should load.

---

## Task 9: Seed Sanity with existing hardcoded data

**Step 1: Open Sanity Studio at `http://localhost:3000/studio`**

**Step 2: Create Shows** (4 records matching `SHOWS` in `src/components/Shows.tsx`)
```
1. Roba da matti summer tour 2025 | 15 LUG 2025 | Pescara | Stadio Adriatico | Disponibile
2. Roba da matti summer tour 2025 | 22 LUG 2025 | Chieti | Anfiteatro La Civitella | Disponibile
3. Non è mai troppo Abruzzo | 10 AGO 2025 | L'Aquila | Piazza Duomo | Ultimi Posti
4. Comedy show | 05 SET 2025 | Roma | Teatro Brancaccio | Sold Out
```

**Step 3: Create Quotes** (5 records matching `QUOTES` in `src/components/Quotes.tsx`)
```
1. "Un talento naturale..." | Il Centro | Quotidiano
2. "Vincenzo Olivieri non fa solo ridere..." | Radio Delta 1 | Emittente Radiofonica
3. "È il figlio che ho sempre sognato..." | Mia Mamma | Critica Severissima
4. "Riesce a far ridere anche chi ha il mutuo..." | Corriere d'Abruzzo | Stampa Locale
5. "Sul palco come nella vita..." | Radio Studio 1 | Radio
```

**Step 4: Create Videos** (4 records matching `VIDEOS` in `src/components/Videoflix.tsx`)
```
1. Il meglio di Cammellò | Sketch | 12:45 | https://images.unsplash.com/... | featured: true | order: 0
2. Intervista a Radio Delta 1 | Interviste | 08:20 | https://images.unsplash.com/... | order: 1
3. Dietro le quinte del Tour | Backstage | 15:30 | https://images.unsplash.com/... | order: 2
4. Monologo sull'Abruzzo | Stand-up | 05:15 | https://images.unsplash.com/... | order: 3
```

---

## Task 10: Wire Sanity data to components

**Files:**
- Modify: `app/page.tsx` — add GROQ queries
- Modify: `src/components/Shows.tsx` — accept `shows` prop
- Modify: `src/components/Quotes.tsx` — accept `quotes` prop
- Modify: `src/components/Videoflix.tsx` — accept `videos` prop
- Modify: `src/components/App.tsx` — accept and pass props

**Step 1: Update `app/page.tsx` with Sanity fetches**
```typescript
import { client } from '@/sanity/lib/client'
import App from '@/components/App'

async function getShows() {
  return client.fetch(`*[_type == "show"] | order(date asc) {
    _id, title, date, location, venue, status, ticketUrl
  }`)
}

async function getQuotes() {
  return client.fetch(`*[_type == "quote"] { _id, text, author, role }`)
}

async function getVideos() {
  return client.fetch(`*[_type == "video"] | order(order asc) {
    _id, title, category, duration, thumbnailUrl, videoUrl, featured
  }`)
}

export default async function Page() {
  const [shows, quotes, videos] = await Promise.all([
    getShows(), getQuotes(), getVideos()
  ])
  return <App shows={shows} quotes={quotes} videos={videos} />
}
```

**Step 2: Add TypeScript types** — Create `src/types/sanity.ts`
```typescript
export interface Show {
  _id: string
  title: string
  date: string
  location: string
  venue: string
  status: 'Disponibile' | 'Ultimi Posti' | 'Sold Out'
  ticketUrl?: string
}

export interface Quote {
  _id: string
  text: string
  author: string
  role: string
}

export interface Video {
  _id: string
  title: string
  category: string
  duration: string
  thumbnailUrl: string
  videoUrl?: string
  featured: boolean
}
```

**Step 3: Update `src/components/App.tsx` to accept props**
```typescript
'use client'
// ... existing imports ...
import type { Show, Quote, Video } from '@/types/sanity'

interface AppProps {
  shows?: Show[]
  quotes?: Quote[]
  videos?: Video[]
}

export default function App({ shows = [], quotes = [], videos = [] }: AppProps) {
  // ... existing hooks ...
  return (
    <div className="bg-[#050505] min-h-screen font-sans selection:bg-comedy-yellow selection:text-black md:cursor-none">
      {/* ... */}
      <Shows shows={shows} />
      <Quotes quotes={quotes} />
      <Videoflix videos={videos} />
      {/* ... */}
    </div>
  )
}
```

**Step 4: Update `src/components/Shows.tsx`**
- Remove hardcoded `SHOWS` array
- Add props interface: `interface ShowsProps { shows: Show[] }`
- Replace `SHOWS.map(...)` with `shows.map(...)`
- Parse date from ISO string: `new Date(show.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()`
- Update ticket link: `href={show.ticketUrl ?? '#'}`

**Step 5: Update `src/components/Quotes.tsx`**
- Remove hardcoded `QUOTES` array
- Add props interface: `interface QuotesProps { quotes: Quote[] }`
- Update `QuoteCard` to accept `Quote` type
- Replace `QUOTES` references with `quotes` prop

**Step 6: Update `src/components/Videoflix.tsx`**
- Remove hardcoded `VIDEOS` array
- Add props interface: `interface VideoflixProps { videos: Video[] }`
- Replace `VIDEOS[0]` with `videos.find(v => v.featured) ?? videos[0]`
- Replace `VIDEOS.slice(1, 3)` with `videos.filter(v => !v.featured).slice(0, 2)`
- Replace `VIDEOS[3]` with `videos.filter(v => !v.featured)[2]`

---

## Task 11: SEO — OG image placeholder + favicon

**Files:**
- Create: `public/og-image.png` (placeholder)
- Create: `public/favicon.ico` (placeholder)

**Step 1: Create a minimal placeholder OG image**
```bash
# Create a simple 1200x630 black PNG as placeholder
# Replace later with real design
convert -size 1200x630 xc:#050505 -fill '#FFD700' -font Helvetica-Bold -pointsize 80 \
  -gravity center -annotate 0 'Vincenzo Olivieri' public/og-image.png 2>/dev/null || \
  # If ImageMagick not available, copy any existing image:
  cp /System/Library/Frameworks/AppKit.framework/Versions/C/Resources/NSApplicationIcon.icns public/favicon.ico 2>/dev/null || true
```

If ImageMagick not available, the metadata in layout.tsx will just fail gracefully (OG image missing is not a blocking issue for launch).

---

## Task 12: Push + connect Vercel

**Step 1: Commit all changes**
```bash
git add .
git commit -m "feat: migrate to Next.js 15 + Sanity CMS"
git push origin main
```

**Step 2: Add Sanity env vars to Vercel**
In Vercel dashboard (vercel.com/papemat/vincenzo-olivieri-official/settings/environment-variables):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = your project ID
- `NEXT_PUBLIC_SANITY_DATASET` = production

**Step 3: Connect GitHub to Vercel project**
In Vercel dashboard → Project Settings → Git:
- Connect to `papemat/vincenzo-olivieri-official`
- Branch: `main`
- Auto-deploy on push: enabled

**Step 4: Trigger deploy**
```bash
git commit --allow-empty -m "chore: trigger vercel deploy"
git push origin main
```

**Step 5: Verify production**
- Open Vercel deployment URL
- Check: shows, quotes, videos load from Sanity
- Check: `/studio` route accessible
- Check: SEO meta tags (view source → `<title>`, `<meta property="og:...">`)

---

## Verification Checklist

- [ ] `npm run dev` → site loads on localhost:3000 without errors
- [ ] `npm run build` → build completes successfully
- [ ] Splash screen appears and fades correctly
- [ ] GSAP animations work (hero, scroll triggers)
- [ ] Lenis smooth scroll works
- [ ] Shows, Quotes, Videos render from Sanity data
- [ ] Sanity Studio accessible at `/studio`
- [ ] Add/edit a show in Studio → page refresh shows updated data
- [ ] GitHub repo has all source code
- [ ] Vercel auto-deploys on push to `main`
- [ ] Production URL shows correct metadata (view source)
