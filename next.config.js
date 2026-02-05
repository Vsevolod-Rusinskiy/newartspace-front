// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_PROTOCOL || 'http',
        hostname: process.env.NEXT_PUBLIC_HOST || 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
      },
    ],
    // Временная защита от CVE-2025-59471 (DoS в Image Optimizer)
    // Ограничения размера изображений применяются через middleware.ts
    // Для полного исправления требуется обновление до Next.js 15.5.10+
    minimumCacheTTL: 60,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  },
}

module.exports = nextConfig
