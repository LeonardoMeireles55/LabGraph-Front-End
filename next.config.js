/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === 'development',
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;