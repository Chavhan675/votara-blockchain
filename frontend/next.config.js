/** @type {import('next').NextConfig} */

const nextConfig = {

  reactStrictMode: true,

  // Improve build performance
  swcMinify: true,

  // Image configuration
  images: {
    unoptimized: true,
    domains: [
      "localhost"
    ]
  },

  // Enable gzip compression
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          }
        ]
      }
    ]
  }

}

module.exports = nextConfig