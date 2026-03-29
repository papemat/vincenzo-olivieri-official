import ClientApp from '@/components/ClientApp'
import { getClient } from '../sanity/lib/client'
import type { Show, Quote, Video } from '@/types/sanity'

// Disable static prerendering — site uses GSAP/Lenis/Motion which require browser APIs
export const dynamic = 'force-dynamic'

async function getShows(): Promise<Show[]> {
  try {
    return await getClient().fetch(
      `*[_type == "show"] | order(date asc) { _id, title, date, location, venue, status, ticketUrl }`
    )
  } catch {
    return []
  }
}

async function getQuotes(): Promise<Quote[]> {
  try {
    return await getClient().fetch(
      `*[_type == "quote"] { _id, text, author, role }`
    )
  } catch {
    return []
  }
}

async function getVideos(): Promise<Video[]> {
  try {
    return await getClient().fetch(
      `*[_type == "video"] | order(order asc, _createdAt asc) { _id, title, category, duration, thumbnailUrl, videoUrl, featured, order }`
    )
  } catch {
    return []
  }
}

export default async function Page() {
  const [shows, quotes, videos] = await Promise.all([
    getShows(),
    getQuotes(),
    getVideos(),
  ])

  return <ClientApp shows={shows} quotes={quotes} videos={videos} />
}
