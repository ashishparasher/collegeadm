/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      // Old /colleges/:slug → new /college/:slug (singular)
      { source: '/colleges/:slug', destination: '/college/:slug', permanent: true },
      // Old /listings routes
      { source: '/listings', destination: '/colleges', permanent: true },
      { source: '/listings/:slug', destination: '/college/:slug', permanent: true },
      // Old about page
      { source: '/about-us-2', destination: '/about', permanent: true },
      // Old SEO pages: colleges-in-:city
      { source: '/colleges-in-:city', destination: '/colleges/:city', permanent: true },
      // Old SEO pages: top-:course-colleges-in-:city
      { source: '/top-:course-colleges-in-:city', destination: '/colleges/:city', permanent: true, has: [{ type: 'query', key: 'course', value: ':course' }] },
      { source: '/best-:course-colleges-in-:city', destination: '/colleges/:city', permanent: true },
      { source: '/private-:course-colleges-in-:city', destination: '/colleges/:city', permanent: true },
      { source: '/direct-admission-:course-colleges-in-:city', destination: '/colleges/:city', permanent: true },
    ];
  },
};

module.exports = nextConfig;
