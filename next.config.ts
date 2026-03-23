import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  experimental: {
    // Sanity uses useEffectEvent which requires React 19 ESM exports
    esmExternals: true,
  },
}

export default nextConfig
