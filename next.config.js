/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === 'development',
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
