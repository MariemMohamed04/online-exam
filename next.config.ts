// import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exam.elevateegy.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        port: '',
        pathname: '/platform/profilepic/**',
      },
    ],
  },
};

export default nextConfig;
