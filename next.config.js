/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This is the modern replacement that actually helps TBT
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },
  // Keep your other settings (images, etc.) here
};

module.exports = nextConfig;

// trigger
