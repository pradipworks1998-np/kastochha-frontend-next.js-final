/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add this section below:
  experimental: {
    inlineCss: true,
  },
};

module.exports = nextConfig;