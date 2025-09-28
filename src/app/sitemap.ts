import { MetadataRoute } from 'next'
import { GalleryData } from '@/types/gallery'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://localmap.cc'
  
  // 갤러리 데이터 로드
  let galleryData: GalleryData
  try {
    const data = await import('../../public/data/images.json')
    galleryData = data.default as GalleryData
  } catch (error) {
    console.error('Error loading gallery data for sitemap:', error)
    galleryData = {
      images: [],
      tags: [],
      metadata: {
        version: "1.0",
        lastUpdated: new Date().toISOString().split('T')[0],
        totalImages: 0,
        totalTags: 0
      }
    }
  }

  const lastModified = new Date(galleryData.metadata.lastUpdated)

  // 기본 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'daily',
      priority: 1,
    }
  ]

  // 태그별 페이지들 (가상 URL - 실제로는 클라이언트 사이드 필터링)
  const tagPages: MetadataRoute.Sitemap = galleryData.tags.map((tag) => ({
    url: `${baseUrl}?tag=${encodeURIComponent(tag.name)}`,
    lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 지역별 페이지들
  const locationTags = ['서울', '부산', '제주', '경주']
  const locationPages: MetadataRoute.Sitemap = locationTags.map((location) => ({
    url: `${baseUrl}?location=${encodeURIComponent(location)}`,
    lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 카테고리별 페이지들
  const categoryTags = ['맛집', '전통주', '벚꽃', '온천', '휴게소']
  const categoryPages: MetadataRoute.Sitemap = categoryTags.map((category) => ({
    url: `${baseUrl}?category=${encodeURIComponent(category)}`,
    lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...locationPages,
    ...categoryPages,
    ...tagPages,
  ]
}
