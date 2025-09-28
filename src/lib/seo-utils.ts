import { Metadata } from 'next'
import { GalleryData, Image } from '@/types/gallery'

export function generateImageMetadata(image: Image): Metadata {
  const title = `${image.title} | 로컬리`
  const description = `${image.description || image.title} - ${image.tags.join(', ')} | 네이버에 안나오는 동네지도`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/images/${image.filename}`,
          width: 1200,
          height: 630,
          alt: `${image.title} - 로컬리`,
        }
      ],
    },
    twitter: {
      title,
      description,
      images: [`/images/${image.filename}`],
    },
  }
}

export function generateTagMetadata(tagName: string, galleryData: GalleryData): Metadata {
  const tag = galleryData.tags.find(t => t.name === tagName)
  const tagImages = galleryData.images.filter(img => img.tags.includes(tagName))
  
  const title = `${tagName} 관련 정보 | 로컬리`
  const description = `${tagName} ${tag?.description || '관련 정보'}를 확인하세요. ${tagImages.length}개의 이미지와 정보를 제공합니다. | 네이버에 안나오는 동네지도`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: tagImages.slice(0, 4).map(img => ({
        url: `/images/${img.filename}`,
        width: 600,
        height: 400,
        alt: `${img.title} - ${tagName}`,
      })),
    },
    twitter: {
      title,
      description,
      images: tagImages.slice(0, 1).map(img => `/images/${img.filename}`),
    },
  }
}

export function generateLocationMetadata(location: string, galleryData: GalleryData): Metadata {
  const locationImages = galleryData.images.filter(img => 
    img.tags.some(tag => tag.includes(location))
  )
  
  const title = `${location} 맛집 여행지 정보 | 로컬리`
  const description = `${location} 지역의 맛집, 여행지, 숨은명소 정보를 확인하세요. ${locationImages.length}개의 검증된 정보를 제공합니다. | 네이버에 안나오는 동네지도`
  
  return {
    title,
    description,
    keywords: [`${location}맛집`, `${location}여행`, `${location}관광`, `${location}명소`, `${location}가볼만한곳`],
    openGraph: {
      title,
      description,
      images: locationImages.slice(0, 4).map(img => ({
        url: `/images/${img.filename}`,
        width: 600,
        height: 400,
        alt: `${img.title} - ${location}`,
      })),
    },
    twitter: {
      title,
      description,
      images: locationImages.slice(0, 1).map(img => `/images/${img.filename}`),
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export function generateLocalBusinessSchema(name: string, description: string, location: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KR",
      "addressRegion": location
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.5665", // 서울 기본 좌표 (실제로는 각 지역별로 설정)
      "longitude": "126.9780"
    },
    "url": "https://localmap.cc",
    "telephone": "+82-2-0000-0000", // 실제 연락처로 교체
    "priceRange": "$$",
    "servesCuisine": "Korean",
    "acceptsReservations": "True"
  }
}
