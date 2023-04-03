/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => [
    {
      source: '/graphql',
      destination: 'http://152.228.215.94:83/api'
    }
  ]
}

module.exports = nextConfig
