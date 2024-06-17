/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOST,
        port: process.env.NEXT_PUBLIC_IMAGE_PORT,
        ///---
        // protocol: 'http',
        // hostname: 'localhost',
        // hostname: 'host.docker.internal',
        // port: '3000',
      },
    ],
  },
};

export default nextConfig;

