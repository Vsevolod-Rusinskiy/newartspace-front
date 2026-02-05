import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware для защиты от CVE-2025-59471 (DoS в Image Optimizer)
 *
 * Временная мера защиты до обновления Next.js до 15.5.10+
 * Ограничивает размер запросов к Image Optimizer для предотвращения DoS атак
 */
export function middleware(request: NextRequest) {
  // Защита только для Image Optimizer endpoint
  if (request.nextUrl.pathname.startsWith('/_next/image')) {
    // Проверяем размер query параметров (URL может быть очень длинным при больших изображениях)
    const urlLength = request.nextUrl.toString().length

    // Ограничиваем длину URL до 8KB (достаточно для нормальных изображений)
    // Это предотвращает загрузку очень больших изображений через Image Optimizer
    if (urlLength > 8192) {
      return new NextResponse('Request URL too long', { status: 414 })
    }

    // Дополнительная проверка: ограничиваем размер query параметра url
    const imageUrl = request.nextUrl.searchParams.get('url')
    if (imageUrl && imageUrl.length > 4096) {
      return new NextResponse('Image URL too long', { status: 400 })
    }
  }

  return NextResponse.next()
}

// Применяем middleware только к Image Optimizer endpoint
export const config = {
  matcher: '/_next/image/:path*',
}
