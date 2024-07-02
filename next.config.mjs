/** @type {import('next').NextConfig} */


const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: process.env.NEXT_PUBLIC_PROTOCOL || 'http',
        // hostname: process.env.NEXT_PUBLIC_HOST || 'localhost',
        protocol:  'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

