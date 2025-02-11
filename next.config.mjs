/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, _) => ({
  //   ...config,
  //   watchOptions: {
  //     ...config.watchOptions,
  //     poll: 800,
  //     aggregateTimeout: 300,
  //   },
  // }),
  reactStrictMode: process.env.NODE_ENV === 'development',
  compiler: {
    removeConsole: true,
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
