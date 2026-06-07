import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'learning-reg-museum-rebate.trycloudflare.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'beer-managers-uses-doctor.trycloudflare.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '10.10.20.57',
        port: '8001',
        pathname: '/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://learning-reg-museum-rebate.trycloudflare.com/api/v1/:path*'
      }
    ]
  }
};

export default nextConfig;
