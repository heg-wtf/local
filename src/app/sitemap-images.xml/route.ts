import { NextResponse } from 'next/server'
import { GalleryData } from '@/types/gallery'

export const dynamic = 'force-static'

export async function GET() {
  try {
    // 갤러리 데이터 로드
    const data = await import('../../../public/data/images.json')
    const galleryData = data.default as GalleryData
    
    const baseUrl = 'https://localmap.cc'
    
    // XML 사이트맵 생성
    const imagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date(galleryData.metadata.lastUpdated).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    ${galleryData.images.map(image => `
    <image:image>
      <image:loc>${baseUrl}/images/${image.filename}</image:loc>
      <image:caption>${image.title}</image:caption>
      <image:title>${image.title}</image:title>
      <image:license>${baseUrl}</image:license>
      <image:geo_location>대한민국</image:geo_location>
    </image:image>`).join('')}
  </url>
</urlset>`

    return new NextResponse(imagesXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Error generating image sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
