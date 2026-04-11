/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  async redirects() {
    return [
      { source: '/listings', destination: '/colleges', permanent: true },
      { source: '/listings/:slug', destination: '/colleges/:slug', permanent: true },
    ];
  },
};

module.exports = nextConfig;
