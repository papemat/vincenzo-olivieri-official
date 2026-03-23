import { createClient } from '@sanity/client'

export function getClient() {
  const projectId = process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

  if (!projectId) {
    throw new Error('Missing Sanity projectId — set SANITY_PROJECT_ID in Vercel env vars')
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: true,
  })
}
